function Platform(){this.width=70,this.height=17,this.x=Math.random()*(width-this.width),this.y=position,position+=height/platformCount,this.flag=0,this.state=0,this.cx=0,this.cy=0,this.cwidth=105,this.cheight=31,this.draw=function(){try{this.type==1?this.cy=0:this.type==2?this.cy=61:this.type==3&&this.flag===0?this.cy=31:this.type==3&&this.flag==1?this.cy=1e3:this.type==4&&this.state===0?this.cy=90:this.type==4&&this.state==1&&(this.cy=1e3),ctx.drawImage(image,this.cx,this.cy,this.cwidth,this.cheight,this.x,this.y,this.width,this.height)}catch(n){}},this.types=score>=5e3?[2,3,3,3,4,4,4,4]:score>=2e3&&score<5e3?[2,2,2,3,3,3,3,4,4,4,4]:score>=1e3&&score<2e3?[2,2,2,3,3,3,3,3]:score>=500&&score<1e3?[1,1,1,1,1,2,2,2,2,3,3,3,3]:score>=100&&score<500?[1,1,1,1,2,2]:[1],this.type=this.types[Math.floor(Math.random()*this.types.length)],this.type==3&&broken<1?broken++:this.type==3&&broken>=1&&(this.type=1,broken=0),this.moved=0,this.vx=1}
function init(){
     function i(){ctx.clearRect(0,0,width,height)}
     function r(){n=="left"?(player.dir="left",player.vy<-7&&player.vy>-15&&(player.dir="left_land")):n=="right"&&(player.dir="right",player.vy<-7&&player.vy>-15&&(player.dir="right_land")),document.onkeydown=function(t){var i=t.keyCode;i==37?(n="left",player.isMovingLeft=!0):i==39&&(n="right",player.isMovingRight=!0),i==32&&(firstRun===!0?init():reset())},document.onkeyup=function(t){var i=t.keyCode;i==37?(n="left",player.isMovingLeft=!1):i==39&&(n="right",player.isMovingRight=!1)},player.isMovingLeft===!0?(player.x+=player.vx,player.vx-=.15):(player.x+=player.vx,player.vx<0&&(player.vx+=.1)),player.isMovingRight===!0?(player.x+=player.vx,player.vx+=.15):(player.x+=player.vx,player.vx>0&&(player.vx-=.1)),player.vx>8?player.vx=8:player.vx<-8&&(player.vx=-8),player.y+player.height>base.y&&base.y<height&&player.jump(),base.y>height&&player.y+player.height>height&&player.isDead!="lol"&&(player.isDead=!0),player.x>width?player.x=0-player.width:player.x<0-player.width&&(player.x=width),player.y>=height/2-player.height/2?(player.y+=player.vy,player.vy+=gravity):(platforms.forEach(function(n,t){player.vy<0&&(n.y-=player.vy),n.y>height&&(platforms[t]=new Platform,platforms[t].y=n.y-height)}),base.y-=player.vy,player.vy+=gravity,player.vy>=0&&(player.y+=player.vy,player.vy+=gravity),score++),e(),player.isDead===!0&&s()}
     function u(){var n=Spring,t=platforms[0];t.type==1||t.type==2?(n.x=t.x+t.width/2-n.width/2,n.y=t.y-t.height-10,n.y>height/1.1&&(n.state=0),n.draw()):(n.x=0-n.width,n.y=0-n.height)}function f(){var n=platform_broken_substitute;platforms.forEach(function(i){i.type==2&&((i.x<0||i.x+i.width>width)&&(i.vx*=-1),i.x+=i.vx),i.flag==1&&n.appearance===!1&&t===0&&(n.x=i.x,n.y=i.y,n.appearance=!0,t++),i.draw()}),n.appearance===!0&&(n.draw(),n.y+=8),n.y>height&&(n.appearance=!1)}function e(){platforms.forEach(function(n){if(player.vy>0&&n.state===0&&player.x+15<n.x+n.width&&player.x+player.width-15>n.x&&player.y+player.height>n.y&&player.y+player.height<n.y+n.height){if(n.type==3&&n.flag===0){n.flag=1,t=0;return}if(n.type==4&&n.state===0)player.jump(),n.state=1;else{if(n.flag==1)return;player.jump()}}});var n=Spring;player.vy>0&&n.state===0&&player.x+15<n.x+n.width&&player.x+player.width-15>n.x&&player.y+player.height>n.y&&player.y+player.height<n.y+n.height&&(n.state=1,player.jumpHigh())}
     function o(){var n=document.getElementById("score");n.innerHTML=score}
     function s(){var n,t;platforms.forEach(function(n){n.y-=12}),player.y>height/2&&flag===0?(player.y-=8,player.vy=0):player.y<height/2?flag=1:player.y+player.height>height&&(showGoMenu(),hideScore(),player.isDead="lol",page_url=parent!==window?document.referrer:window.top.location.href,n=document.getElementById("tweetBtn"),n.href="http://twitter.com/share?url="+page_url+"&text=I just scored "+score+" points in HTML5 Doodle Jump!&count=horizontal")}
     function h(){i(),f(),u(),r(),player.draw(),base.draw(),o()}
     var n="left",t=0;
     (firstRun=!1)||(menuLoop=function(){return},animloop=function(){h(),requestAnimFrame(animloop)},animloop(),hideMenu(),showScore())
}

function reset(){hideGoMenu(),showScore(),player.isDead=!1,flag=0,position=0,score=0,base=new Base,player=new Player,Spring=new spring,platform_broken_substitute=new Platform_broken_substitute,platforms=[];for(var n=0;n<platformCount;n++)platforms.push(new Platform)}
function hideMenu(){var n=document.getElementById("mainMenu");n.style.zIndex=-1}
function showGoMenu(){var n=document.getElementById("gameOverMenu"),t;n.style.zIndex=1,n.style.visibility="visible",t=document.getElementById("go_score"),t.innerHTML="You scored "+score+" points!"}function hideGoMenu(){var n=document.getElementById("gameOverMenu");n.style.zIndex=-1,n.style.visibility="hidden"}
function showScore(){var n=document.getElementById("scoreBoard");n.style.zIndex=1}
function hideScore(){var n=document.getElementById("scoreBoard");n.style.zIndex=-1}
function playerJump() {
    player.y += player.vy,
        player.vy += gravity,
    player.vy > 0 && player.x + 15 < 260 && player.x + player.width - 15 > 155 && player.y + player.height > 475 && player.y + player.height < 500 && player.jump(),
        dir == "left" ? (player.dir = "left", player.vy < -7 && player.vy > -15 && (player.dir = "left_land")) : dir == "right" && (player.dir = "right", player.vy < -7 && player.vy > -15 && (player.dir = "right_land")),
        document.onkeydown = function(n) {
            var t = n.keyCode;
            t == 37 ? (dir = "left", player.isMovingLeft = !0) : t == 39 && (dir = "right", player.isMovingRight = !0),
            t == 32 && (firstRun === !0 ? (init(), firstRun = !1) : reset())
        },
        document.onkeyup = function(n) {
            var t = n.keyCode;
            t == 37 ? (dir = "left", player.isMovingLeft = !1) : t == 39 && (dir = "right", player.isMovingRight = !1)
        },
        player.isMovingLeft === !0 ? (player.x += player.vx, player.vx -= .15) : (player.x += player.vx, player.vx < 0 && (player.vx += .1)),
        player.isMovingRight === !0 ? (player.x += player.vx, player.vx += .15) : (player.x += player.vx, player.vx > 0 && (player.vx -= .1)),
    player.y + player.height > base.y && base.y < height && player.jump(),
        player.x > width ? player.x = 0 - player.width: player.x < 0 - player.width && (player.x = width),
        player.draw()
}
function update() {
    ctx.clearRect(0, 0, width, height),
        playerJump()
}
var i;
window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(n) {
            window.setTimeout(n, 1e3 / 60)
        }
} ();
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 422,
    height = 552;
canvas.width = width,
    canvas.height = height;
var platforms = [],
    image = document.getElementById("sprite"),
    player,
    platformCount = 10,
    position = 0,
    gravity = .2,
    animloop,
    flag = 0,
    menuloop,
    broken = 0,
    dir,
    score = 0,
    firstRun = !0,
    Base = function() {
        this.height = 5,
            this.width = width,
            this.cx = 0,
            this.cy = 614,
            this.cwidth = 100,
            this.cheight = 5,
            this.moved = 0,
            this.x = 0,
            this.y = height - this.height,
            this.draw = function() {
                try {
                    ctx.drawImage(image, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height)
                } catch(n) {}
            }
    },
    base = new Base,
    Player = function() {
        this.vy = 11,
            this.vx = 0,
            this.isMovingLeft = !1,
            this.isMovingRight = !1,
            this.isDead = !1,
            this.width = 55,
            this.height = 40,
            this.cx = 0,
            this.cy = 0,
            this.cwidth = 110,
            this.cheight = 80,
            this.dir = "left",
            this.x = width / 2 - this.width / 2,
            this.y = height,
            this.draw = function() {
                try {
                    this.dir == "right" ? this.cy = 121 : this.dir == "left" ? this.cy = 201 : this.dir == "right_land" ? this.cy = 289 : this.dir == "left_land" && (this.cy = 371),
                        ctx.drawImage(image, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height)
                } catch(n) {}
            },
            this.jump = function() {
                this.vy = -8
            },
            this.jumpHigh = function() {
                this.vy = -16
            }
    };
for (player = new Player, i = 0; i < platformCount; i++) platforms.push(new Platform);
var Platform_broken_substitute = function() {
        this.height = 30,
            this.width = 70,
            this.x = 0,
            this.y = 0,
            this.cx = 0,
            this.cy = 554,
            this.cwidth = 105,
            this.cheight = 60,
            this.appearance = !1,
            this.draw = function() {
                try {
                    if (this.appearance === !0) ctx.drawImage(image, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height);
                    else return
                } catch(n) {}
            }
    },
    platform_broken_substitute = new Platform_broken_substitute,
    spring = function() {
        this.x = 0,
            this.y = 0,
            this.width = 26,
            this.height = 30,
            this.cx = 0,
            this.cy = 0,
            this.cwidth = 45,
            this.cheight = 53,
            this.state = 0,
            this.draw = function() {
                try {
                    this.state === 0 ? this.cy = 445 : this.state == 1 && (this.cy = 501),
                        ctx.drawImage(image, this.cx, this.cy, this.cwidth, this.cheight, this.x, this.y, this.width, this.height)
                } catch(n) {}
            }
    },
    Spring = new spring;
menuLoop=function(){update(),requestAnimFrame(menuLoop)}
menuLoop()