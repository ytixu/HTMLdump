var DIST = 40.0;
var ERROR = 15.0;


var movement = {
    start_x: null,
    start_y: null,
    end_x: null, 
    end_y: null,

    set_start: function(sx, sy){
        this.start_x = sx;
        this.start_y = sy;
    },

    set_end: function(ex, ey){
        this.end_x = ex;
        this.end_y = ey;
    },

    print: function(){
        console.log(this.start_x, this.start_y, this.end_x, this.end_y);
    }, 

    x_dist: function(){
        return this.end_x - this.start_x;
    },

    y_dist: function(){
        return this.end_y - this.start_y;
    },

    distance: function(){
        var xs = this.x_dist();
        xs = xs * xs;
        var ys = this.y_dist();
        ys = ys * ys;

        return Math.sqrt( xs + ys );
    }, 

    add_x: function(n){
        return this.start_x + n;
    }, 
    add_y: function(n){
        return this.start_y + n;
    },

    change: function(){
        var denom = (Math.abs(this.x_dist()) + Math.abs(this.y_dist()));
        if (denom == 0) return {dx: 0, dy:0};
        var d_y = Math.round(this.x_dist() * ERROR/denom);
        var d_x = Math.round(this.y_dist() * ERROR/denom);
        return {dx: d_x, dy:d_y};
    }
};

function get_angle(){
    var x = movement.x_dist();
    var y = movement.y_dist();
    if (x == 0 && y == 0) return Math.random()*360;
    var angleRad = Math.atan(y *1.0 / x); 
    console.log(angleRad);
    if (x < 0){
         return angleRad * 180 / Math.PI + 270;
    }
    return angleRad * 180 / Math.PI + 90;
}

function get_interval(){
    var dist = movement.distance();
    var inter_num = dist/DIST;
    var num = Math.round(inter_num);
    if (num == 0) return {xi:0, yi:0, num:1};
    var inter_x = Math.round(movement.x_dist()/inter_num);
    var inter_y = Math.round(movement.y_dist()/inter_num);
    
    return {xi:inter_x, yi:inter_y, num:num};
}

function draw(end_evt){
    movement.set_end(end_evt.pageX, end_evt.pageY);
    movement.print();
    window.removeEventListener("mouseup", draw, false);
    itvls = get_interval();
    angle = 'rotate('+get_angle().toString()+'deg)';
    change = movement.change();
    console.log(angle, itvls.num)

    for (var i=0; i<itvls.num; i++){
        var x = movement.add_x(itvls.xi*i);
        var y = movement.add_y(itvls.yi*i);
        console.log(x, y, 'bibibi');
        if (i%2 == 0){
            x -= change.dx;
            y += change.dy;
        }else{
            x += change.dx;
            y -= change.dy;
        }
        stick_paw(y.toString()+'px', x.toString()+'px', angle, KEY, IMAGE[COLOR]);
    }
    KEY += 1;
};

window.addEventListener('contextmenu', function(e){e.preventDefault()});

window.addEventListener("mousedown", function(start_evt){
    if (start_evt.which==3){
        start_evt.preventDefault();
        movement.set_start(start_evt.pageX, start_evt.pageY);
        window.addEventListener("mouseup", draw, false);
    }
}, false);

