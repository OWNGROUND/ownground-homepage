(function(){
  const registry={
    ko:{label:'KO',name:'한국어',enabled:true,dir:'ltr'},
    en:{label:'EN',name:'English',enabled:true,dir:'ltr'},
    ja:{label:'JA',name:'日本語',enabled:true,dir:'ltr'},
    es:{label:'ES',name:'Español',enabled:true,dir:'ltr'},
    vi:{label:'VI',name:'Tiếng Việt',enabled:true,dir:'ltr'},
    id:{label:'ID',name:'Bahasa Indonesia',enabled:true,dir:'ltr'},
    th:{label:'TH',name:'ไทย',enabled:true,dir:'ltr'}
  };

  const messages={
    ko:{
      documentTitle:'OWNGROUND | 제조의 오늘과 내일을 잇습니다.',
      heroTitle:'제조의 오늘과 내일을<br><span>잇습니다.</span>',
      fromDataTitle:'데이터에서 시작해,<br>현장을 보게 되었습니다.',
      fromDataBody1:'데이터를 분석할수록 숫자만으로는 충분하지 않았습니다.<br>그 숫자가 어디에서, 어떻게 만들어지는지를 이해해야 했습니다.',
      fromDataBody2:'좋은 데이터는 좋은 분석보다 먼저,<br>좋은 운영에서 시작됩니다.',
      fromDataConclusion:'좋은 운영은<br>현장에서 시작됩니다.',
      fromDataAria:'Data의 표면에서 Operation의 맥락을 거쳐 Field라는 근원을 발견하는 세 개의 Evidence Layer',
      fieldTitle:'현장이 변화를<br>주도합니다.',
      fieldBody1:'제조의 변화는 기술에서 시작하지 않습니다.<br>실제로 만들고, 보고, 판단하는 현장에서 시작합니다.',
      fieldBody2:'기술은 현장을 대신하는 것이 아니라,<br>현장이 더 나은 판단을 내릴 수 있도록 도와야 합니다.',
      fieldValue:'가치는 이미 있습니다.<br>필요한 것은 연결입니다.',
      fieldValueAria:'서로 연결되지 않은 채 이미 존재하는 가치의 지점들',
      gapTitle:'기술이 닿지 못한 곳보다,<br>서로 닿지 않는 곳을 봅니다.',
      gapPairs:[['설계','생산'],['현장','사무'],['설비','시스템'],['경험','데이터'],['생산','재고'],['사람','정보']],
      gapListAria:'제조 현장의 여섯 가지 단절',
      gapClose:'현장이 더 잘 판단할 수 있도록,<br>필요한 연결을 만듭니다.',
      platformTitle:'필요한 연결이<br>하나의 제조환경을 만듭니다.',
      ecosystemTitle:'하나의 플랫폼,<br>서로 다른 네 개의 역할.',
      ecosystemAria:'OWNGROUND 제품별 역할',
      ecosystemRoles:['제조 운영의 흐름을 보고 판단합니다.','설계정보와 판단의 맥락을 연결합니다.','현장의 신호를 사용할 수 있는 정보로 연결합니다.','복잡한 데이터를 실제 업무로 가져옵니다.']
    },
    en:{
      documentTitle:'OWNGROUND — Manufacturing Operations Platform',
      heroTitle:"Connecting today's manufacturing<br><span>to tomorrow.</span>",
      fromDataTitle:'We started with data.<br>It led us to the shop floor.',
      fromDataBody1:'The more we analyzed data, the clearer it became that numbers alone were not enough.<br>We needed to understand where those numbers came from and how they were created.',
      fromDataBody2:'Good data begins with good operations,<br>before good analysis can even begin.',
      fromDataConclusion:'Good operations<br>begin on the shop floor.',
      fromDataAria:'Three evidence layers moving from the surface of Data through the context of Operation to the origin in the Field',
      fieldTitle:'The shop floor<br>leads change.',
      fieldBody1:'Manufacturing transformation does not begin with technology.<br>It begins on the shop floor, where work is done, observed, and decisions are made.',
      fieldBody2:'Technology should not replace the shop floor.<br>It should help people on the shop floor make better decisions.',
      fieldValue:'The value is already here.<br>What it needs is connection.',
      fieldValueAria:'Points of value that already exist but remain disconnected',
      gapTitle:'We look not at where technology has yet to reach,<br>but at what still is not connected.',
      gapPairs:[['Design','Production'],['Shop floor','Office'],['Equipment','System'],['Experience','Data'],['Production','Inventory'],['People','Information']],
      gapListAria:'Six disconnected relationships in manufacturing',
      gapClose:'We make the connections the shop floor needs<br>to make better decisions.',
      platformTitle:'The connections that matter<br>create one manufacturing environment.',
      ecosystemTitle:'One platform,<br>four distinct roles.',
      ecosystemAria:'OWNGROUND product roles',
      ecosystemRoles:['See and assess the flow of manufacturing operations.','Connect design information with the context behind decisions.','Turn signals from the shop floor into usable information.','Bring complex data into real work.']
    },
    ja:{
      documentTitle:'OWNGROUND — Manufacturing Operations Platform',
      heroTitle:'製造の今日と明日を<br><span>つなぎます。</span>',
      fromDataTitle:'データから始まり、<br>現場へと目を向けるようになりました。',
      fromDataBody1:'データを分析すればするほど、数字だけでは十分ではないことが分かってきました。<br>その数字がどこで、どのように生まれたのかを理解する必要がありました。',
      fromDataBody2:'良いデータは、良い分析より前に、<br>良い運用から始まります。',
      fromDataConclusion:'良い運用は、<br>現場から始まります。',
      fromDataAria:'Dataの表面からOperationの文脈を経てFieldという起点に至る3つのEvidence Layer',
      fieldTitle:'現場が変化を<br>主導します。',
      fieldBody1:'製造の変化は、技術から始まるのではありません。<br>実際につくり、見て、判断する現場から始まります。',
      fieldBody2:'技術は現場に取って代わるものではなく、<br>現場がより良い判断を下せるよう支えるべきです。',
      fieldValue:'価値は、すでにここにあります。<br>必要なのは、つながりです。',
      fieldValueAria:'まだつながっていないものの、すでに存在する価値の点',
      gapTitle:'技術が届いていない場所よりも、<br>まだ互いにつながっていないところに目を向けます。',
      gapPairs:[['設計','生産'],['現場','事務'],['設備','システム'],['経験','データ'],['生産','在庫'],['人','情報']],
      gapListAria:'製造現場にある6つの分断',
      gapClose:'現場がより良く判断できるよう、<br>必要なつながりをつくります。',
      platformTitle:'必要なつながりが、<br>一つの製造環境をつくります。',
      ecosystemTitle:'一つのプラットフォーム、<br>異なる4つの役割。',
      ecosystemAria:'OWNGROUND製品ごとの役割',
      ecosystemRoles:['製造オペレーションの流れを見て、判断します。','設計情報と判断の文脈をつなぎます。','現場のシグナルを、使える情報へつなぎます。','複雑なデータを実際の業務へつなげます。']
    },
    es:{
      documentTitle:'OWNGROUND — Manufacturing Operations Platform',
      heroTitle:'Conectamos la manufactura de hoy<br><span>con la de mañana.</span>',
      fromDataTitle:'Empezamos con los datos<br>y eso nos llevó a mirar la planta.',
      fromDataBody1:'Cuanto más analizábamos los datos, más claro resultaba que los números por sí solos no bastaban.<br>Necesitábamos entender dónde se generaban esos números y cómo llegaban a existir.',
      fromDataBody2:'Los buenos datos empiezan, antes que con un buen análisis,<br>con una buena operación.',
      fromDataConclusion:'Una buena operación<br>empieza en planta.',
      fromDataAria:'Tres Evidence Layers que avanzan desde la superficie de Data, por el contexto de Operation, hasta el origen en Field',
      fieldTitle:'La planta lidera<br>el cambio.',
      fieldBody1:'El cambio en la manufactura no empieza con la tecnología.<br>Empieza en la planta, donde realmente se produce, se observa y se decide.',
      fieldBody2:'La tecnología no debe sustituir a la planta,<br>sino ayudar a quienes trabajan en ella a tomar mejores decisiones.',
      fieldValue:'El valor ya existe.<br>Lo que falta es conexión.',
      fieldValueAria:'Puntos de valor que ya existen pero siguen desconectados',
      gapTitle:'No nos fijamos en dónde aún no llega la tecnología,<br>sino en dónde las cosas aún no están conectadas.',
      gapPairs:[['Diseño','Producción'],['Planta','Oficina'],['Equipos','Sistema'],['Experiencia','Datos'],['Producción','Inventario'],['Personas','Información']],
      gapListAria:'Seis relaciones desconectadas en la fabricación',
      gapClose:'Creamos las conexiones necesarias<br>para que la planta pueda tomar mejores decisiones.',
      platformTitle:'Las conexiones necesarias<br>crean un único entorno de manufactura.',
      ecosystemTitle:'Una plataforma,<br>cuatro roles distintos.',
      ecosystemAria:'Funciones de los productos OWNGROUND',
      ecosystemRoles:['Vemos y evaluamos el flujo de las operaciones de manufactura.','Conectamos la información de diseño con el contexto de las decisiones.','Convertimos las señales de planta en información utilizable.','Llevamos los datos complejos al trabajo real.']
    },
    vi:{
      documentTitle:'OWNGROUND — Manufacturing Operations Platform',
      heroTitle:'Kết nối sản xuất hôm nay<br><span>với ngày mai.</span>',
      fromDataTitle:'Bắt đầu từ dữ liệu,<br>chúng tôi dần nhìn về xưởng sản xuất.',
      fromDataBody1:'Càng phân tích dữ liệu, chúng tôi càng nhận ra rằng chỉ những con số là chưa đủ.<br>Chúng tôi cần hiểu những con số ấy được tạo ra ở đâu và hình thành như thế nào.',
      fromDataBody2:'Dữ liệu tốt bắt đầu từ vận hành tốt,<br>trước cả khi trở thành một phân tích tốt.',
      fromDataConclusion:'Vận hành tốt<br>bắt đầu từ xưởng sản xuất.',
      fromDataAria:'Ba Evidence Layer đi từ bề mặt của Data, qua bối cảnh của Operation, đến nguồn gốc tại Field',
      fieldTitle:'Sự thay đổi được dẫn dắt<br>từ xưởng sản xuất.',
      fieldBody1:'Sự thay đổi trong sản xuất không bắt đầu từ công nghệ.<br>Nó bắt đầu ngay tại xưởng sản xuất, nơi công việc thực sự được thực hiện, quan sát và quyết định.',
      fieldBody2:'Công nghệ không thay thế xưởng sản xuất.<br>Công nghệ phải giúp những người tại xưởng đưa ra quyết định tốt hơn.',
      fieldValue:'Giá trị đã hiện hữu.<br>Điều còn thiếu là sự kết nối.',
      fieldValueAria:'Những điểm giá trị đã tồn tại nhưng chưa được kết nối',
      gapTitle:'Chúng tôi không nhìn vào nơi công nghệ chưa chạm tới,<br>mà nhìn vào những nơi vẫn chưa được kết nối với nhau.',
      gapPairs:[['Thiết kế','Sản xuất'],['Xưởng sản xuất','Văn phòng'],['Thiết bị','Hệ thống'],['Kinh nghiệm','Dữ liệu'],['Sản xuất','Tồn kho'],['Con người','Thông tin']],
      gapListAria:'Sáu mối quan hệ bị gián đoạn trong sản xuất',
      gapClose:'Chúng tôi tạo ra những kết nối cần thiết<br>để xưởng sản xuất có thể đưa ra quyết định tốt hơn.',
      platformTitle:'Những kết nối cần thiết<br>tạo nên một môi trường sản xuất thống nhất.',
      ecosystemTitle:'Một nền tảng,<br>bốn vai trò khác nhau.',
      ecosystemAria:'Vai trò của các sản phẩm OWNGROUND',
      ecosystemRoles:['Quan sát và đánh giá dòng vận hành sản xuất.','Kết nối thông tin thiết kế với bối cảnh của các quyết định.','Biến tín hiệu từ xưởng sản xuất thành thông tin có thể sử dụng.','Đưa dữ liệu phức tạp vào công việc thực tế.']
    },
    id:{
      documentTitle:'OWNGROUND — Manufacturing Operations Platform',
      heroTitle:'Menghubungkan manufaktur hari ini<br><span>dengan hari esok.</span>',
      fromDataTitle:'Kami berawal dari data,<br>lalu mulai melihat ke lantai produksi.',
      fromDataBody1:'Semakin kami menganalisis data, semakin jelas bahwa angka saja tidak cukup.<br>Kami perlu memahami dari mana angka-angka itu berasal dan bagaimana angka itu terbentuk.',
      fromDataBody2:'Data yang baik bermula dari operasi yang baik,<br>bahkan sebelum menjadi analisis yang baik.',
      fromDataConclusion:'Operasi yang baik<br>bermula dari lantai produksi.',
      fromDataAria:'Tiga Evidence Layer yang bergerak dari permukaan Data, melalui konteks Operation, menuju sumber di Field',
      fieldTitle:'Perubahan dipimpin<br>dari lantai produksi.',
      fieldBody1:'Perubahan manufaktur tidak dimulai dari teknologi.<br>Perubahan dimulai di lantai produksi, tempat pekerjaan benar-benar dilakukan, diamati, dan diputuskan.',
      fieldBody2:'Teknologi bukan untuk menggantikan lantai produksi,<br>melainkan membantu orang-orang di dalamnya mengambil keputusan yang lebih baik.',
      fieldValue:'Nilainya sudah ada.<br>Yang dibutuhkan adalah koneksi.',
      fieldValueAria:'Titik-titik nilai yang sudah ada tetapi belum terhubung',
      gapTitle:'Kami tidak melihat tempat yang belum dijangkau teknologi,<br>melainkan tempat-tempat yang belum saling terhubung.',
      gapPairs:[['Desain','Produksi'],['Lantai produksi','Kantor'],['Peralatan','Sistem'],['Pengalaman','Data'],['Produksi','Persediaan'],['Orang','Informasi']],
      gapListAria:'Enam hubungan yang terputus dalam manufaktur',
      gapClose:'Kami membangun koneksi yang dibutuhkan<br>agar lantai produksi dapat mengambil keputusan yang lebih baik.',
      platformTitle:'Koneksi yang dibutuhkan<br>membentuk satu lingkungan manufaktur.',
      ecosystemTitle:'Satu platform,<br>empat peran yang berbeda.',
      ecosystemAria:'Peran produk OWNGROUND',
      ecosystemRoles:['Melihat dan menilai alur operasi manufaktur.','Menghubungkan informasi desain dengan konteks di balik keputusan.','Mengubah sinyal dari lantai produksi menjadi informasi yang dapat digunakan.','Membawa data yang kompleks ke pekerjaan nyata.']
    },
    th:{
      documentTitle:'OWNGROUND — Manufacturing Operations Platform',
      heroTitle:'เชื่อมการผลิตของวันนี้<br><span>สู่วันพรุ่งนี้</span>',
      fromDataTitle:'เราเริ่มจากข้อมูล<br>แล้วจึงหันมามองหน้างาน',
      fromDataBody1:'ยิ่งวิเคราะห์ข้อมูลมากขึ้น เราก็ยิ่งเห็นว่าตัวเลขเพียงอย่างเดียวยังไม่เพียงพอ<br>เราต้องเข้าใจว่าตัวเลขเหล่านั้นเกิดขึ้นที่ไหน และเกิดขึ้นได้อย่างไร',
      fromDataBody2:'ข้อมูลที่ดีเริ่มจากการดำเนินงานที่ดี<br>ก่อนจะกลายเป็นการวิเคราะห์ที่ดี',
      fromDataConclusion:'การดำเนินงานที่ดี<br>เริ่มต้นที่หน้างาน',
      fromDataAria:'Evidence Layer สามระดับจากพื้นผิวของ Data ผ่านบริบทของ Operation ไปสู่ต้นกำเนิดที่ Field',
      fieldTitle:'หน้างานเป็นผู้ขับเคลื่อน<br>การเปลี่ยนแปลง',
      fieldBody1:'การเปลี่ยนแปลงในภาคการผลิตไม่ได้เริ่มจากเทคโนโลยี<br>แต่เริ่มจากหน้างาน ที่ซึ่งมีการลงมือทำ มองเห็น และตัดสินใจจริง',
      fieldBody2:'เทคโนโลยีไม่ควรมาแทนที่หน้างาน<br>แต่ควรช่วยให้คนหน้างานตัดสินใจได้ดีขึ้น',
      fieldValue:'คุณค่ามีอยู่แล้ว<br>สิ่งที่ต้องการคือการเชื่อมโยง',
      fieldValueAria:'จุดของคุณค่าที่มีอยู่แล้วแต่ยังไม่ได้เชื่อมโยงกัน',
      gapTitle:'เราไม่ได้มองหาจุดที่เทคโนโลยียังเข้าไม่ถึง<br>แต่มองหาจุดที่สิ่งต่าง ๆ ยังไม่เชื่อมถึงกัน',
      gapPairs:[['การออกแบบ','การผลิต'],['หน้างาน','สำนักงาน'],['อุปกรณ์','ระบบ'],['ประสบการณ์','ข้อมูล'],['การผลิต','สินค้าคงคลัง'],['คน','สารสนเทศ']],
      gapListAria:'ความสัมพันธ์หกประการที่ยังขาดการเชื่อมโยงในการผลิต',
      gapClose:'เราสร้างการเชื่อมโยงที่จำเป็น<br>เพื่อให้หน้างานตัดสินใจได้ดีขึ้น',
      platformTitle:'การเชื่อมโยงที่จำเป็น<br>สร้างสภาพแวดล้อมการผลิตที่เชื่อมเป็นหนึ่งเดียว',
      ecosystemTitle:'หนึ่งแพลตฟอร์ม<br>สี่บทบาทที่แตกต่างกัน',
      ecosystemAria:'บทบาทของผลิตภัณฑ์ OWNGROUND',
      ecosystemRoles:['มองเห็นและประเมินการไหลของการดำเนินงานการผลิต','เชื่อมข้อมูลการออกแบบเข้ากับบริบทของการตัดสินใจ','เปลี่ยนสัญญาณจากหน้างานให้เป็นข้อมูลที่นำไปใช้ได้','นำข้อมูลที่ซับซ้อนเข้าสู่งานจริง']
    }
  };

  const contract=Object.freeze({canonical:'ko',active:['ko','en','ja','es','vi','id','th'],reserved:[],translationSource:'ko'});
  const requiredKeys=Object.keys(messages.ko);

  const setHTML=(root,selector,value)=>{const el=root.querySelector(selector);if(el)el.innerHTML=value};
  const setText=(root,selector,value)=>{const el=root.querySelector(selector);if(el)el.textContent=value};
  const apply=(doc,panel,locale)=>{
    const selected=registry[locale]?.enabled?locale:'ko';
    const copy={...messages.ko,...messages[selected]};
    doc.documentElement.lang=selected;
    doc.documentElement.dir=registry[selected].dir;
    panel.classList.toggle('locale-latin',['en','es','vi','id'].includes(selected));
    panel.classList.toggle('locale-ja',selected==='ja');
    doc.title=copy.documentTitle;
    setHTML(panel,'#brand-core .hero-title',copy.heroTitle);
    setHTML(panel,'#from-data .from-data-title',copy.fromDataTitle);
    setHTML(panel,'#from-data .from-data-body p:nth-child(1)',copy.fromDataBody1);
    setHTML(panel,'#from-data .from-data-body p:nth-child(2)',copy.fromDataBody2);
    setHTML(panel,'#from-data .from-data-conclusion strong',copy.fromDataConclusion);
    const flow=panel.querySelector('#from-data .from-data-flow');if(flow)flow.setAttribute('aria-label',copy.fromDataAria);
    setHTML(panel,'#field-leads .philosophy-title',copy.fieldTitle);
    setHTML(panel,'#field-leads .philosophy-body-inline p:nth-child(1)',copy.fieldBody1);
    setHTML(panel,'#field-leads .philosophy-body-inline p:nth-child(2)',copy.fieldBody2);
    setHTML(panel,'#field-leads .field-value-title',copy.fieldValue);
    const values=panel.querySelector('#field-leads .unconnected-field');if(values)values.setAttribute('aria-label',copy.fieldValueAria);
    setHTML(panel,'#the-gap .story-head h2',copy.gapTitle);
    panel.querySelectorAll('#the-gap .gap-relation').forEach((row,index)=>{
      const pair=copy.gapPairs[index];if(!pair)return;
      const words=row.querySelectorAll('strong');if(words[0])words[0].textContent=pair[0];if(words[1])words[1].textContent=pair[1];
    });
    const gapList=panel.querySelector('#the-gap .gap-list');if(gapList)gapList.setAttribute('aria-label',copy.gapListAria);
    setHTML(panel,'#the-gap .gap-close strong',copy.gapClose);
    setHTML(panel,'#the-platform .platform-head h2',copy.platformTitle);
    setHTML(panel,'#ecosystem .ecosystem-title',copy.ecosystemTitle);
    const ecosystemGrid=panel.querySelector('#ecosystem .ecosystem-grid');if(ecosystemGrid)ecosystemGrid.setAttribute('aria-label',copy.ecosystemAria);
    panel.querySelectorAll('#ecosystem .ecosystem-role p').forEach((el,index)=>{if(copy.ecosystemRoles[index])el.textContent=copy.ecosystemRoles[index]});
    return selected;
  };

  const completeness=locale=>requiredKeys.every(key=>Object.prototype.hasOwnProperty.call(messages[locale]||{},key));
  window.OWNGROUND_I18N=Object.freeze({registry,messages,contract,requiredKeys,completeness,apply});
})();
