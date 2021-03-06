
Vue.component('product',{
    props:{
        primary:{
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
       
       <br>
      

       </div>

       <br>

       <product-tabs :reviews="reviews" @TransmiReview="addReview" ></product-tabs>

       <br>

       
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
        reviews:[],
    
    }
    
},
methods:{
        IncrCart: function(){
            this.$emit('add-to-cart')
        },
        DecrCart: function(){

            this.$emit('delete-cart')
         
            },
        updateProduct:function(index){
            this.SelectedVariant=index
            console.log(this.SelectedVariant)
        },
        addReview:function(ProductReview){
            this.reviews.push(ProductReview)

        }

      
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
        if (this.primary){
            return " "+"free"
        }
        return " "+ 2.99+"$";
    }
}
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name" required>
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea  required id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input required type="submit" value="Submit">  
    </p>    
  
  </form>

    `,
    data() {
      return {
        name: null,
        review:null,
        rating:null,
        errors: [],
      }
    },
    methods:{
        onSubmit(){
            if(this.name && this.review && this.rating){
            let productReview={
                name:this.name,
                review:this.review,
                rating:this.rating
            }
            console.log('hada product review',productReview)
            this.$emit('review-submiting',productReview)
            this.name=null,
            this.review=null,
            this.rating=null
        }
        else{
            if(!this.name) this.errors.push("Name required.")
            if(!this.review) this.errors.push("Review required.")
            if(!this.rating) this.errors.push("Rating required.")
    
        }
        }
        
    }
  })


Vue.component('product-tabs',{
    props:{
        reviews:{
            type:Array,
            required:true
        }
    },
    template:`
    <div>
        <span class="tab" 
        :class="{activeTab:selectedTab===tab}"
        v-for="(tab, index) in tabs" 
        :key="index"
        @click="selectedTab=tab">
        {{ tab }}</span>


        <br>

        <br>

                <div v-show="selectedTab===tabs[0]">
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    </li>
                </ul>
                </div>

                <div v-show="selectedTab===tabs[1]"> 
         <product-review @review-submiting="TransmiReview"><product-review> 
                </div>

    </div>
  `,
    data(){
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab:'Reviews',  
        }
    },
    methods:{

     
        TransmiReview:function(reviewsData){
            console.log("hadi data",reviewsData)
            this.$emit('TransmiReview',reviewsData)
        }


    }
})

var app=new Vue({
    el:"#app",
    data:{
        premuim:false,
        cart:0,
    },
    methods:{
        updateCart:function(){
            this.cart+=1;
        },
        DeleteCart:function(){
            if (this.cart>0){
                this.cart-=1;
            }
            else this.cart=0
        }
    }
})


