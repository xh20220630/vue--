// 省份以及二级地区的数据
const Province=[
    {
      text: "天津",
      City: [
        {text: "不限"},
        {text: "天津"},
      ]
    },
    {
      text: "河北",
      City: [
        {text: "不限"},
        {text: "石家庄市"},
        {text: "唐山市"},
        {text: "秦皇岛市"},
        {text: "邯郸市"},
        {text: "邢台市"},
        {text: "保定市"},
        {text: "张家口市"},
        {text: "承德市"},
        {text: "沧州市"},
        {text: "廊坊市"},
        {text: "衡水市"}
      ]
    },
    {
      text: "山西",
      City: [
        {text: "不限"},
        {text: "太原市"},
        {text: "大同市"},
        {text: "阳泉市"},
        {text: "长治市"},
        {text: "晋城市"},
        {text: "朔州市"},
        {text: "晋中市"},
        {text: "运城市"},
        {text: "忻州市"},
        {text: "临汾市"},
        {text: "吕梁市"}
      ]
    },
    {
      text: "内蒙古",
      City: [
        {text: "不限"},
        {text: "呼和浩特市"},
        {text: "包头市"},
        {text: "乌海市"},
        {text: "赤峰市"},
        {text: "通辽市"},
        {text: "鄂尔多斯市"},
        {text: "呼伦贝尔市"},
        {text: "巴彦淖尔市"},
        {text: "乌兰察布市"},
        {text: "兴安盟"},
        {text: "锡林郭勒盟"},
        {text: "阿拉善盟"}
      ]
    },
    {
      text: "辽宁",
      City: [
        {text: "沈阳市"},
        {text: "大连市"},
        {text: "鞍山市"},
        {text: "抚顺市"},
        {text: "本溪市"},
        {text: "丹东市"},
        {text: "锦州市"},
        {text: "营口市"},
        {text: "阜新市"},
        {text: "辽阳市"},
        {text: "盘锦市"},
        {text: "铁岭市"},
        {text: "朝阳市"},
        {text: "葫芦岛市"}
      ]
    },
    {
      text: "吉林"
      , City: [
      {text: "长春市"},
      {text: "吉林市"},
      {text: "四平市"},
      {text: "辽源市"},
      {text: "通化市"},
      {text: "白山市"},
      {text: "松原市"},
      {text: "白城市"},
      {text: "延边朝鲜族自治州"}
    ]
    },
    {
      text: "黑龙江"
      , City: [
      {text: "哈尔滨市"},
      {text: "齐齐哈尔市"},
      {text: "鸡西市"},
      {text: "鹤岗市"},
      {text: "双鸭山市"},
      {text: "大庆市"},
      {text: "伊春市"},
      {text: "佳木斯市"},
      {text: "七台河市"},
      {text: "牡丹江市"},
      {text: "黑河市"},
      {text: "绥化市"},
      {text: "大兴安岭地区"}
    ]
    },
    {
      text: "上海"
      , City: [
      {text: "上海市"}
    ]
    },

    {
      text: "江苏"
      , City: [
      {text: "南京市"},
      {text: "无锡市"},
      {text: "徐州市"},
      {text: "常州市"},
      {text: "苏州市"},
      {text: "南通市"},
      {text: "连云港市"},
      {text: "淮安市"},
      {text: "盐城市"},
      {text: "扬州市"},
      {text: "镇江市"},
      {text: "泰州市"},
      {text: "宿迁市"}
    ]
    },
    {
      text: "浙江"
      , City: [
      {text: "杭州市"},
      {text: "宁波市"},
      {text: "温州市"},
      {text: "嘉兴市"},
      {text: "湖州市"},
      {text: "绍兴市"},
      {text: "金华市"},
      {text: "衢州市"},
      {text: "舟山市"},
      {text: "台州市"},
      {text: "丽水市"}
    ]
    },
    {
      text: "安徽"
      , City: [
      {text: "合肥市"},
      {text: "芜湖市"},
      {text: "蚌埠市"},
      {text: "淮南市"},
      {text: "马鞍山市"},
      {text: "淮北市"},
      {text: "铜陵市"},
      {text: "安庆市"},
      {text: "黄山市"},
      {text: "滁州市"},
      {text: "阜阳市"},
      {text: "宿州市"},
      {text: "巢湖市"},
      {text: "六安市"},
      {text: "亳州市"},
      {text: "池州市"},
      {text: "宣城市"}
    ]
    },
    {
      text: "福建"
      , City: [
      {text: "福州市"},
      {text: "厦门市"},
      {text: "莆田市"},
      {text: "三明市"},
      {text: "泉州市"},
      {text: "漳州市"},
      {text: "南平市"},
      {text: "龙岩市"},
      {text: "宁德市"}
    ]
    },
    {
      text: "江西"
      , City: [
      {text: "南昌市"},
      {text: "景德镇市"},
      {text: "萍乡市"},
      {text: "九江市"},
      {text: "新余市"},
      {text: "鹰潭市"},
      {text: "赣州市"},
      {text: "吉安市"},
      {text: "宜春市"},
      {text: "抚州市"},
      {text: "上饶市"}
    ]
    },
    {
      text: "山东"
      , City: [
      {text: "济南市"},
      {text: "青岛市"},
      {text: "淄博市"},
      {text: "枣庄市"},
      {text: "东营市"},
      {text: "烟台市"},
      {text: "潍坊市"},
      {text: "济宁市"},
      {text: "泰安市"},
      {text: "威海市"},
      {text: "日照市"},
      {text: "莱芜市"},
      {text: "临沂市"},
      {text: "德州市"},
      {text: "聊城市"},
      {text: "滨州市"},
      {text: "菏泽市"}
    ]
    },
    {
      text: "河南"
      , City: [
      {text: "郑州市"},
      {text: "开封市"},
      {text: "洛阳市"},
      {text: "平顶山市"},
      {text: "安阳市"},
      {text: "鹤壁市"},
      {text: "新乡市"},
      {text: "焦作市"},
      {text: "濮阳市"},
      {text: "许昌市"},
      {text: "漯河市"},
      {text: "三门峡市"},
      {text: "南阳市"},
      {text: "商丘市"},
      {text: "信阳市"},
      {text: "周口市"},
      {text: "驻马店市"}
    ]
    },
    {
      text: "湖北"
      , City: [
      {text: "武汉市"},
      {text: "黄石市"},
      {text: "十堰市"},
      {text: "宜昌市"},
      {text: "襄樊市"},
      {text: "鄂州市"},
      {text: "荆门市"},
      {text: "孝感市"},
      {text: "荆州市"},
      {text: "黄冈市"},
      {text: "咸宁市"},
      {text: "随州市"},
      {text: "恩施土家族苗族自治州"}
    ]
    },
    {
      text: "湖南"
      , City: [
      {text: "长沙市"},
      {text: "株洲市"},
      {text: "湘潭市"},
      {text: "衡阳市"},
      {text: "邵阳市"},
      {text: "岳阳市"},
      {text: "常德市"},
      {text: "张家界市"},
      {text: "益阳市"},
      {text: "郴州市"},
      {text: "永州市"},
      {text: "怀化市"},
      {text: "娄底市"},
      {text: "湘西土家族苗族自治州"}
    ]
    },
    {
      text: "广东"
      , City: [
      {text: "广州市"},
      {text: "韶关市"},
      {text: "深圳市"},
      {text: "珠海市"},
      {text: "汕头市"},
      {text: "佛山市"},
      {text: "江门市"},
      {text: "湛江市"},
      {text: "茂名市"},
      {text: "肇庆市"},
      {text: "惠州市"},
      {text: "梅州市"},
      {text: "汕尾市"},
      {text: "河源市"},
      {text: "阳江市"},
      {text: "清远市"},
      {text: "东莞市"},
      {text: "中山市"},
      {text: "潮州市"},
      {text: "揭阳市"},
      {text: "云浮市"}
    ]
    },
    {
      text: "广西"
      , City: [
      {text: "南宁市"},
      {text: "柳州市"},
      {text: "桂林市"},
      {text: "梧州市"},
      {text: "北海市"},
      {text: "防城港市"},
      {text: "钦州市"},
      {text: "贵港市"},
      {text: "玉林市"},
      {text: "百色市"},
      {text: "贺州市"},
      {text: "河池市"},
      {text: "来宾市"},
      {text: "崇左市"}
    ]
    },
    {
      text: "海南"
      , City: [
      {text: "海口市"},
      {text: "三亚市"}
    ]
    },
    {
      text: "重庆"
      , City: [
      {text: "重庆市"}
    ]
    },
    {
      text: "四川"
      , City: [
      {text: "成都市"},
      {text: "自贡市"},
      {text: "攀枝花市"},
      {text: "泸州市"},
      {text: "德阳市"},
      {text: "绵阳市"},
      {text: "广元市"},
      {text: "遂宁市"},
      {text: "内江市"},
      {text: "乐山市"},
      {text: "南充市"},
      {text: "眉山市"},
      {text: "宜宾市"},
      {text: "广安市"},
      {text: "达州市"},
      {text: "雅安市"},
      {text: "巴中市"},
      {text: "资阳市"},
      {text: "阿坝藏族羌族自治州"},
      {text: "甘孜藏族自治州"},
      {text: "凉山彝族自治州"}
    ]
    },
    {
      text: "贵州"
      , City: [
      {text: "贵阳市"},
      {text: "六盘水市"},
      {text: "遵义市"},
      {text: "安顺市"},
      {text: "铜仁地区"},
      {text: "黔西南布依族苗族自治州"},
      {text: "毕节地区"},
      {text: "黔东南苗族侗族自治州"},
      {text: "黔南布依族苗族自治州"}
    ]
    },
    {
      text: "云南"
      , City: [
      {text: "昆明市"},
      {text: "曲靖市"},
      {text: "玉溪市"},
      {text: "保山市"},
      {text: "昭通市"},
      {text: "丽江市"},
      {text: "普洱市"},
      {text: "临沧市"},
      {text: "楚雄彝族自治州"},
      {text: "红河哈尼族彝族自治州"},
      {text: "文山壮族苗族自治州"},
      {text: "西双版纳傣族自治州"},
      {text: "大理白族自治州"},
      {text: "德宏傣族景颇族自治州"},
      {text: "怒江傈僳族自治州"},
      {text: "迪庆藏族自治州"}
    ]
    },
    {
      text: "西藏"
      , City: [
      {text: "拉萨市"},
      {text: "昌都地区"},
      {text: "山南地区"},
      {text: "日喀则地区"},
      {text: "那曲地区"},
      {text: "阿里地区"},
      {text: "林芝地区"}
    ]
    },
    {
      text: "陕西"
      , City: [
      {text: "西安市"},
      {text: "铜川市"},
      {text: "宝鸡市"},
      {text: "咸阳市"},
      {text: "渭南市"},
      {text: "延安市"},
      {text: "汉中市"},
      {text: "榆林市"},
      {text: "安康市"},
      {text: "商洛市"}
    ]
    },
    {
      text: "甘肃"
      , City: [
      {text: "兰州市"},
      {text: "嘉峪关市"},
      {text: "金昌市"},
      {text: "白银市"},
      {text: "天水市"},
      {text: "武威市"},
      {text: "张掖市"},
      {text: "平凉市"},
      {text: "酒泉市"},
      {text: "庆阳市"},
      {text: "定西市"},
      {text: "陇南市"},
      {text: "临夏回族自治州"},
      {text: "甘南藏族自治州"}
    ]
    },
    {
      text: "青海"
      , City: [
      {text: "西宁市"},
      {text: "海东地区"},
      {text: "海北藏族自治州"},
      {text: "黄南藏族自治州"},
      {text: "海南藏族自治州"},
      {text: "果洛藏族自治州"},
      {text: "玉树藏族自治州"},
      {text: "海西蒙古族藏族自治州"}
    ]
    },
    {
      text: "宁夏"
      , City: [
      {text: "银川市"},
      {text: "石嘴山市"},
      {text: "吴忠市"},
      {text: "固原市"},
      {text: "中卫市"}
    ]
    },
    {
      text: "新疆"
      , City: [
      {text: "乌鲁木齐市"},
      {text: "克拉玛依市"},
      {text: "吐鲁番地区"},
      {text: "哈密地区"},
      {text: "昌吉回族自治州"},
      {text: "博尔塔拉蒙古自治州"},
      {text: "巴音郭楞蒙古自治州"},
      {text: "阿克苏地区"},
      {text: "克孜勒苏柯尔克孜自治州"},
      {text: "喀什地区"},
      {text: "和田地区"},
      {text: "伊犁哈萨克自治州"},
      {text: "塔城地区"},
      {text: "阿勒泰地区"}
    ]
    },
    {
      text: "台湾"
      , City: [
      {text: "台北市"},
      {text: "高雄市"},
      {text: "基隆市"},
      {text: "台中市"},
      {text: "台南市"},
      {text: "新竹市"},
      {text: "嘉义市"},
      {text: "台北县"},
      {text: "宜兰县"},
      {text: "桃园县"},
      {text: "新竹县"},
      {text: "苗栗县"},
      {text: "台中县"},
      {text: "彰化县"},
      {text: "南投县"},
      {text: "云林县"},
      {text: "嘉义县"},
      {text: "台南县"},
      {text: "高雄县"},
      {text: "屏东县"},
      {text: "澎湖县"},
      {text: "台东县"},
      {text: "花莲县"}
    ]
    },
    {
      text: "香港"
      , City: [
      {text: "中西区"},
      {text: "东区"},
      {text: "九龙城区"},
      {text: "观塘区"},
      {text: "南区"},
      {text: "深水埗区"},
      {text: "黄大仙区"},
      {text: "湾仔区"},
      {text: "油尖旺区"},
      {text: "离岛区"},
      {text: "葵青区"},
      {text: "北区"},
      {text: "西贡区"},
      {text: "沙田区"},
      {text: "屯门区"},
      {text: "大埔区"},
      {text: "荃湾区"},
      {text: "元朗区"},
    ]
    },
    {
      text: "澳门"
      , City: [
      {text: "花地玛堂区"},
      {text: "圣安多尼堂区"},
      {text: "大堂区"},
      {text: "望德堂区"},
      {text: "风顺堂区"},
      {text: "氹仔"},
      {text: "路环"},
    ]
    },
    {
      text: "海外"
      , City: [
      {text: "美国"},
      {text: "日本"},
      {text: "英国"},
      {text: "法国"},
      {text: "法国"},
      {text: "德国"},
      {text: "韩国"},
      {text: "加拿大"},
      {text: "澳大利亚"},
      {text: "新西兰"},
      {text: "意大利"},
      {text: "俄罗斯"},
      {text: "乌克兰"},
      {text: "新加坡"},
      {text: "其他"}
    ]
    }

  ]

  const newArr = Province.map((item)=>{
    let obj={};
    obj['value']=item.text;
    obj['label']=item.text;
    obj['children']=item.City.map((city)=>{
        let cityObj={};
        if(city.text == "不限"){
            city.text="未知"
        }
        cityObj['value']=city.text;
        cityObj['label']=city.text;
        return cityObj
    })
    return obj
  })
  //导出我们格式化的城市数组
  export default newArr;