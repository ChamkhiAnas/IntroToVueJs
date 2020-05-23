
Vue.component('product',{
    props:{
        premuim:{
            type:Boolean,
            required:false,
        }
    },
    template: `<div class="product">

    <div class="product-image">
        <img :src="image">
    </div>

    <div class="product-info">
        <h1>{{title}}</h1>
        <p v-if="inStock">InStock</p>
        <p v-else="!inStock">OutOfStock</p>


        <p v-else-if="Inventory<=10 && Inventory>0">Almost Sold Out</p> 
        <p v-else>Out of Stock</p> 
        <p>Shipping:{{Shipping}}</p>
        <p v-show="indx">Showing is working</p>
        <p>{{Description}}</p>
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>

       <div  class="color-box" v-for="(variant,index) in variants"
       :key="variant.variantId" 
       :style="{background:variant.variantColor}"
       @mouseover="updateProduct(index)">
        </div>
    
        <div class="cartContainer disabled">
       <button :disabled="!inStock"  :class="{disabledButton:!inStock}" v-on:click="IncrCart" type="button" class="btn btn-primary">Add to cart</button>
       <button v-on:click="DecrCart" type="button" class="btn btn-danger">Remove from cart</button>

        <div class="cart">
            <p>Cart({{cart}})</p>
        </div>
        </div>
    </div>

</div>`, data(){
    return {
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
    }
    
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
    },
    Shipping:function(){
        if (this.premuim){
            return " "+"free"
        }
        return " "+ 2.99+"$";
    }
}
})

var app=new Vue({
    el:"#app",
    data:{
        premuim:true
    }
})


