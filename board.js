//constants
var COL = 16, ROW = 16, BOMB_NUM = 50;
//IDs
var BOMB = -1, EMPTY = 0, FLAG = 1, LIVE = 5;

var grid = {
	width: null,
	height: null,
	_grid: null,

	init: function(c, r){
		this.width = c;
		this.height = r;
		this._grid = [];
		for (var x = 0; x<c; x++){
			this._grid.push([]);
			for (var y=0; y<r; y++){
				this._grid[x].push({open:false, 
									val:EMPTY,
									flag:EMPTY});
			}
		}
	},

	do_to_surrounding: function(c, r, func){
		for (var i=-1; i<2; i++){
			for (var j=-1; j<2; j++){
				x = c+i;
				y = r+j;
				if (!(c==x && r==y)){
					try{
						func(x, y);
					}catch(err){}
				}
			}
		}
	},

	set: function(val, c, r){
		this._grid[c][r].val = val; 
	},

	get: function(c, r){
		return this._grid[c][r].val;
	},

	open_square: function(c, r){
		this._grid[c][r].open = true;
	},

	is_open: function(c, r){
		return this._grid[c][r].open;
	},

	is_bomb: function(c, r){
		return this.get(c, r) == BOMB;
	}, 

	is_flagged: function(c, r){
		return this._grid[c][r].flag == FLAG;
	}, 

	toggle_flag: function(c, r){
		
		if (this.is_flagged(c, r)){
			this._grid[c][r].flag = EMPTY; 
			score.remove_bomb();
		}else{
			this._grid[c][r].flag = FLAG; 
			score.found_bomb();
		}
	}
};

var player = {
	c:null, 
	r:null,
	sweep_c:null,
	sweep_r:null,

	set: function(c, r){
		this.c = c;
		this.r = r;
	},

	get_position: function(){
		return [this.c, this.r];
	},

	aim_sweeper: function(c, r){
		this.sweep_c = c;
		this.sweep_r = r;
	},

	get_aim: function(){
		return [this.sweep_c, this.sweep_r];
	},

	init: function(c, r, cc, rr){
		this.set(c, r);
		this.aim_sweeper(cc, rr);
	}
};

//scoring system 

var RB = 0, HB = 1, CS = 2;

var score = {
	remain_bombs: null, 
	cleared_squares: null,
	lives: null,

	init: function(b){
		this.remain_bombs = b;
		this.cleared_squares = 0;
		this.lives = LIVE;
	},

	found_bomb: function(){
		this.remain_bombs --;
		draw_score(RB);
	},

	remove_bomb: function(){
		this.remain_bombs ++;
		draw_score(RB);
	},

	cleared_square: function(){
		this.cleared_squares ++;
		draw_score(CS);
	},

	hit_bomb: function(){
		this.lives --;
		draw_score(HB);
	}, 

	get_rb: function(){
		return this.remain_bombs;
	}, 

	get_cs: function(){
		return this.cleared_squares;
	},

	get_hb: function(){
		return this.lives;
	},

	get_score: function(){
		return (100+this.cleared_squares)/this.remain_bombs + this.lives*10
	}
}

function set_bombs(start_c, start_r, bombs){
	tiles = []
	sum_min = start_c + start_r - 2;
	sum_max = start_c + start_r + 2;
	diff_min = start_c - start_r - 2;
	diff_max = start_c - start_r + 2;
	for (var i=0; i<grid.width; i++){
		for (var j=0; j<grid.width; j++){
			if ((i+j < sum_min || i+j > sum_max) &&
				(Math.abs(i-j) < diff_min || Math.abs(i-j) > diff_min)){
				tiles.push([i,j]);
			}
		}
	}
	while (bombs>0){
		ind = Math.round(Math.random()*(tiles.length-1))
		coord = tiles[ind];
		tiles.splice(ind, 1);
		grid.set(BOMB, coord[0], coord[1]);
		grid.do_to_surrounding(coord[0], coord[1], 	
			function(c, r){
				if (grid.get(c, r) != BOMB){
					grid._grid[c][r].val++;
				}
			}
		);
		bombs--;
	}
	player.init(start_c, start_r, start_c + 1, start_r); ///////////////////////////
};

//Game objects
var canvas, ctx;
//graphics
var TILE_SIZE = 40;
var disabled_color = '#ddd', enabled_color = '#5c8', bomb_color = '#f55';
var color = ['#333', '#0a0', '#00a', '#d55', '#5d5', '#55d', '#a00'];
var panel_color = 'rgba(255,255,255,0.8);'

function main(){
	canvas = document.createElement('canvas');
	canvas.width = (COL+3)*TILE_SIZE;
	canvas.height = ROW*TILE_SIZE;
	board = document.getElementById('game');
	board.appendChild(canvas);

	ctx = canvas.getContext('2d');
	ctx.font="bold 20px Courier";
	ctx.textAlign="center"; 

	init(0,0);
};

function init(start_c, start_r){
	score.init(BOMB_NUM);
	init_score();
	grid.init(COL, ROW);
	set_bombs(start_c, start_r, BOMB_NUM);
	draw_grid();
	open_tile(start_c, start_r);
	draw_player();
	window.addEventListener("keydown", move_player, false);
};

function write_tile(n, c, r){
	ctx.fillText(n,Math.round((c+0.5)*TILE_SIZE), Math.round((r+0.7)*TILE_SIZE));
};

function draw_tile(c, r){
	ctx.fillRect(c*TILE_SIZE, r*TILE_SIZE, TILE_SIZE, TILE_SIZE);
};

function display_number(c, r, color){
	tile = grid.get(c, r)
	if (tile == EMPTY) return;
	ctx.fillStyle = color;
	if (tile == BOMB) text = 'x';
	else text = tile;
	write_tile(text, c, r);
};

function draw_grid(){
	for (var x = 0; x<grid.width; x++){
		for (var y=0; y<grid.height; y++){
			ctx.fillStyle = enabled_color;
			draw_tile(x, y);
		}
	}
};

function init_score(){
	ctx.fillStyle = disabled_color;
	draw_tile(COL+1, CS);
	ctx.fillStyle = bomb_color;
	draw_tile(COL+1, HB);
	ctx.fillStyle = enabled_color;
	draw_tile(COL+1, RB);

	ctx.fillStyle = color[0];
	write_tile('!', COL+1, RB)
	write_tile('x', COL+1, HB)

	draw_score(RB);
	draw_score(HB);
	draw_score(CS);

}

function draw_score(n){
	ctx.fillStyle = '#fff';
	switch (n){
		case RB:
			draw_tile(COL+2, RB);
			ctx.fillStyle = '#000';
			write_tile(score.get_rb(), COL+2, RB);
			break;
		case HB:
			draw_tile(COL+2, HB);
			ctx.fillStyle = '#000';
			write_tile(score.get_hb(), COL+2, HB);
			break;
		case CS:
			draw_tile(COL+2, CS);
			ctx.fillStyle = '#000';
			write_tile(score.get_cs(), COL+2, CS);
			break;
	}
};

function color_tile(c,r){
	tile = grid.get(c, r);
	text_color = color[0];
	switch (tile) {
		case EMPTY:
			ctx.fillStyle = disabled_color;
			break;
		case BOMB:
			ctx.fillStyle = bomb_color;
			break;
		default:
			ctx.fillStyle = disabled_color;
			text_color = color[tile-1];
	}
	draw_tile(c, r);
	display_number(c, r, text_color);
};

function partial_open_tile(c, r){
	if (grid.is_flagged(c,r)) return;
	open_tile(c, r)
};

function open_tile(c, r){
	if (grid.is_open(c,r)) return;
	grid.open_square(c,r);
	color_tile(c, r);
	if (!grid.is_bomb(c, r)){
		score.cleared_square();
		if (grid.get(c, r) == EMPTY)
			grid.do_to_surrounding(c, r, partial_open_tile);
	}else score.hit_bomb();
};

function end_game(){
	for (var i=0; i<COL; i++){
		for (var j=0; j<ROW; j++){
			if (grid.is_open(i, j)) continue;
			color_tile(i, j);
		}
	}
	window.removeEventListener("keydown", move_player, false);
	ctx.fillStyle = panel_color;
	ctx.fillRect(0, 2*ROW/3*TILE_SIZE, COL*TILE_SIZE, ROW/3*TILE_SIZE);
	ctx.fillStyle = color[0];
	write_tile('SCORE: '+score.get_score(), Math.round(COL/2.4), Math.round(2.5*ROW/3));
	write_tile('Press <space> to continue.', Math.round(COL/2.4), Math.round(2.8*ROW/3));
	window.addEventListener("keydown", restart, false);
};

function restart(e){
	if (e.keyCode == 32){
		init(0,0);
		window.removeEventListener("keydown", restart, false);
	}
};

// keybord controls
var player_color = '#000', player_num_color = '#fff', sweeper_color = '#7ea', flag_color = bomb_color;
 
function draw_player(){
	coord = player.get_position();
	ctx.fillStyle = player_color
	draw_tile(coord[0], coord[1]);
	display_number(coord[0], coord[1], player_num_color);
};

function draw_aim(color){
	coord = player.get_aim();
	ctx.fillStyle = color;
	draw_tile(coord[0], coord[1]);
	if (this.grid.is_flagged(coord[0], coord[1])){
		ctx.fillStyle = flag_color;
		write_tile('!', coord[0], coord[1]);
	}
};

function same_array(a, b){
	return a[0] == b[0] && a[1] == b[1];
};

function move_player(e) {
	move_to = player.get_position();
	switch(e.keyCode){
		case 37: case 100: case 72: //left, 4, H
			move_to[0]--;
			break;
		case 39: case 102: case 75: //right, 6, K
			move_to[0]++;
			break;
		case 38: case 104: case 85: //up, 8, U
			move_to[1]--;
			break;
		case 40: case 98: case 77: //down, 2, M
			move_to[1]++;
			break;
		case 103: case 89: //7, Y
			move_to[0]--;
			move_to[1]--;
			break;
		case 105: case 73: //9, I
			move_to[0]++;
			move_to[1]--;
			break;
		case 97: case 78: //1, N
			move_to[0]--;
			move_to[1]++;
			break;
		case 99: case 188: //3, ,
			move_to[0]++;
			move_to[1]++;
			break;
		case 32: case 96: //space, 0
			coord = player.get_aim();
			if (!grid.is_flagged(coord[0], coord[1]))
				open_tile(coord[0], coord[1]);
			if (score.get_hb() <= 0){
				end_game();
			}
			return;
		case 74: case 101: //J, 5
			coord = player.get_position();
			count = 0;
			grid.do_to_surrounding(coord[0], coord[1], 
				function(c, r){
					if (grid.is_flagged(c, r) || (grid.is_open(c, r) && grid.is_bomb(c, r))) count++;
				}
			);
			if (count == grid.get(coord[0], coord[1]))
				grid.do_to_surrounding(coord[0], coord[1], partial_open_tile);
			return;
		case 16: case 13: //shift, enter (num)
			coord = player.get_aim();
			if (!grid.is_open(coord[0], coord[1])){
				grid.toggle_flag(coord[0], coord[1]);
				draw_aim(sweeper_color);
			}
		default: return 
	}
	// to_move actually moves
	try{
		try{
			prev_tile = player.get_aim();
			if (!grid.is_open(prev_tile[0], prev_tile[1]) && !same_array(prev_tile, move_to))
				draw_aim(enabled_color);
		}catch(err){}
		player.aim_sweeper(move_to[0], move_to[1]);

		if (grid.is_open(move_to[0], move_to[1])){
			coord = player.get_position();
			color_tile(coord[0], coord[1]);
			player.set(move_to[0], move_to[1]);
			draw_player();
		}else{
			try{
				if (!grid.is_open(move_to[0], move_to[1])){
					draw_aim(sweeper_color);
				}
			}catch(err){}
		}
	}catch(err){}
};


main();