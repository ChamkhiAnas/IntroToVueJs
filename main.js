var app=new Vue({

    el:"#app",
    data:{
        Product:"Socks",
        Brand: "Vue Mastery",
        Description:" Vue Js Socks",
        SelectedVariant:0,
        Link: "https://twitter.com/home",
        Inventory: 23,
        indx:false,
        details:["80% cotton","20% Polyster","Gender Neutral"],
        variants:[
            {
                variantId:2234,
                variantColor:"green",
                variantImage:"https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
                variantQuantity:10
            },
            {
                variantId:2235,
                variantColor:"blue",
                variantImage:"https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
                variantQuantity:0

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
            updateProduct:function(index){
                this.SelectedVariant=index
                console.log(this.SelectedVariant)
            },
          
        },
    
    computed:{
        title: function () {
            return this.Brand + "" + this.Product;
          },
        image:function(){
            return this.variants[this.SelectedVariant].variantImage
        },
        inStock:function(){
            return this.variants[this.SelectedVariant].variantQuantity
        }
    }
    
      
  


   
})


