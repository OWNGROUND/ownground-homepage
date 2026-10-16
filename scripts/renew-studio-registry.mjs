import crypto from 'node:crypto';
import fs from 'node:fs';

const DOMAIN=Buffer.from('OWNGROUND_STUDIO_CONNECTION_REGISTRY_V1\0');
const DAY=86_400_000;
const TRUSTED_KEYS=new Map([
 ['og-studio-registry-2026-10','X7qAwTTwc16B4-0plpV-FPAUZX19oOgKxl_k65pRSP8'],
 ['og-studio-registry-gcp-v1','8m_WPKYJEsHZAfCp8XiUTRu4k5PBSOtsMLf3Np7DKXo'],
]);
const args=Object.fromEntries(process.argv.slice(3).map(value=>{const index=value.indexOf('=');return index<0?[value,true]:[value.slice(0,index),value.slice(index+1)]}));
const exact=(value,keys,label)=>{const actual=Object.keys(value).sort(),expected=[...keys].sort();if(JSON.stringify(actual)!==JSON.stringify(expected))throw new Error(`${label} fields are invalid`)};
const output=value=>{if(process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT,`${value}\n`)};
const publicKey=raw=>crypto.createPublicKey({key:Buffer.concat([Buffer.from('302a300506032b6570032100','hex'),Buffer.from(raw,'base64url')]),format:'der',type:'spki'});

function prepare(){
 const envelope=JSON.parse(fs.readFileSync(args.registry,'utf8'));
 exact(envelope,['envelopeVersion','payloadEncoding','payloadSha256','payload','signatures'],'envelope');
 if(envelope.envelopeVersion!==1||envelope.payloadEncoding!=='base64url')throw new Error('Unsupported envelope');
 const currentBytes=Buffer.from(envelope.payload,'base64url');
 if(crypto.createHash('sha256').update(currentBytes).digest('hex')!==envelope.payloadSha256)throw new Error('Current payload hash mismatch');
 if(!envelope.signatures.some(signature=>signature.algorithm==='Ed25519'&&TRUSTED_KEYS.has(signature.keyId)&&crypto.verify(null,Buffer.concat([DOMAIN,currentBytes]),publicKey(TRUSTED_KEYS.get(signature.keyId)),Buffer.from(signature.signature,'base64url'))))throw new Error('Current Registry signature is not trusted');
 const current=JSON.parse(currentBytes);
 exact(current,['schemaVersion','registryVersion','issuedAt','expiresAt','connections'],'payload');
 const remaining=Date.parse(current.expiresAt)-Date.now(),force=args.force==='true';
 if(!force&&remaining>14*DAY){console.log(`Registry renewal skipped: ${Math.ceil(remaining/DAY)} days remain`);output('changed=false');return}
 const issued=new Date(),expires=new Date(issued.getTime()+30*DAY);
 const payload=Buffer.from(JSON.stringify({...current,registryVersion:current.registryVersion+1,issuedAt:issued.toISOString(),expiresAt:expires.toISOString()}));
 fs.writeFileSync(args.payload,payload);
 fs.writeFileSync(args.message,Buffer.concat([DOMAIN,payload]));
 output('changed=true');
 console.log(`Prepared registry version ${current.registryVersion+1}, expiring ${expires.toISOString()}`);
}

function finalize(){
 const payload=fs.readFileSync(args.payload),message=Buffer.concat([DOMAIN,payload]),signature=fs.readFileSync(args.signature),publicKey=crypto.createPublicKey(fs.readFileSync(args.publicKey));
 if(!crypto.verify(null,message,publicKey,signature))throw new Error('KMS signature verification failed');
 const parsed=JSON.parse(payload),ttl=Date.parse(parsed.expiresAt)-Date.parse(parsed.issuedAt);
 if(ttl!==30*DAY)throw new Error('Registry TTL must be exactly 30 days');
 const envelope={envelopeVersion:1,payloadEncoding:'base64url',payloadSha256:crypto.createHash('sha256').update(payload).digest('hex'),payload:payload.toString('base64url'),signatures:[{keyId:'og-studio-registry-gcp-v1',algorithm:'Ed25519',signature:signature.toString('base64url')}]};
 fs.writeFileSync(args.registry,`${JSON.stringify(envelope,null,2)}\n`);
 console.log(`Verified and wrote registry version ${parsed.registryVersion}`);
}

const command=process.argv[2];
if(command==='prepare')prepare();else if(command==='finalize')finalize();else throw new Error('Expected prepare or finalize');
