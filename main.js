var app=new Vue({

    el:"#app",
    data:{
        Product:"Socks",
        Description:" Vue Js Socks",
        Image:"https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
        Link: "https://twitter.com/home",
        Inventory: 23,
        indx:false,
        inStock:false,
        details:["80% cotton","20% Polyster","Gender Neutral"],
        variants:[
            {
                variantId:2234,
                variantColor:"green",
                variantImage:"https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg"
            },
            {
                variantId:2235,
                variantColor:"blue",
                variantImage:"https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg"

            }
        ],

        cart:0,
    },

    methods:{
            IncrCart: function(){
            this.cart+=1;
            },
            DecrCart: function(){
                if (this.cart>0){
                    this.cart-=1;
                }
                else this.cart=0
                },
            updateProduct:function(pic){
                this.Image=pic
            },

        }
  


   
})


