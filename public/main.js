function object2object(tg){
    var ret={}
    for( key in tg ) {
        if( 
            "function"!=typeof(tg[key])
            ) {
            ret[key]=tg[key];
        }
    }
    //console.log(tg,ret)
    return ret
}
var router　=　new VueRouter({
    mode: 'history',
    routes: []
    });
var app = new Vue({
    router,
    el: '#app',
    created: function () {
        var p=this.$route.query.points
        if(p){
            ps = JSON.parse(p)
            for(i in ps){
                this.add_values(ps[i])
            }
        }
    },
    data:function(){
        return {
            points:[],
            select:false,
            editselect:false
        }
    },
    methods: {
        add_values:function(obj){
            obj.getView=function (){
                var ret={}
                ret.top=this.y
                ret.left=this.x
                ret.width=this.w
                ret.height=this.h
                ret.transform="matrix("+ 
                    [this.m1,this.m2,this.m3,this.m4,this.m5,this.m6].join(",")+
                    ") rotate(" + this.r + "deg)"
                return ret;
            }
            obj.getView_eye_in_1=function(){
                var ret={}
                ret.width=this.esize+"%"
                ret.height=this.esize+"%"
                ret.left=this.espot+"%"
                return ret;
            }
            obj.getView_eye_in_2=function(){
                var ret={}
                ret.width=this.esize_in+"%"
                ret.height=this.esize_in+"%"
                ret.left=this.espot_in+"%"
                return ret;
            }
            this.points.push(obj)
        },
        add:function(){
            this.add_values({
                x:0,
                y:0,
                w:Math.round(70*Math.random()+50) ,
                h:Math.round(70*Math.random()+50) ,
                eye:true,
                m1:1,
                m2:0,
                m3:0,
                m4:1,
                m5:0,
                m6:0,
                r:Math.round(360*Math.random()) ,
                esize:Math.round(30*Math.random()+20) ,
                espot:Math.round(50*Math.random()) ,
                esize_in:Math.round(10*Math.random()+40) ,
                espot_in:Math.round(50*Math.random()) 
            })
        },
        change:function(index,move){
            Vue.set(this.points,index,move)
        },
        mouse_down:function(index,e){
            //console.log("mouse_down",index,e)
            this.select=e
            this.editselect=index
        },
        mouse_move:function(index,e){
            //console.log("mouse_move",index,e,this.select!=false)
            if(this.select!=false){
                var n=Object.assign({},this.points[index]);
                n.x=n.x+e.clientX-this.select.clientX;
                n.y=n.y+e.clientY-this.select.clientY;
                //console.log("mouse_move",this.select.offsetX-e.offsetX)
                this.change(index,n);
                this.select=e;
            }
        },
        mouse_up:function(index,e){
            //console.log("mouse_up",index,e)
            this.select=false
        },
        getJson:function(){
            var ret=[]
            for(i in this.points){
                ret.push(object2object(this.points[i]))
            }
            return JSON.stringify(ret)
        },

    popUpTweetWindow: function () {
        var text=`私は新しいかがやきを作りました！`
        var tg_url =`https://inochinokagayaki.hashito.biz/?points=${encodeURI(this.getJson())}`
        const url = `https://twitter.com/intent/tweet?hashtags=inochinokagayakitools&text=${encodeURI(text)}&url=${encodeURI(tg_url)}` 
        const option = 'status=1,width=818,height=400,top=100,left=100'
        window.open(url, 'twitter', option)    
    },
    }
})
  
  