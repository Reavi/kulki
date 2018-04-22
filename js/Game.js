/**
 * Główna klasa gry, która obsługuje jej cykl życia. Inicjalizuje ona inne komponenty, takie jak plansza (Board)
 * czy Model planszy (BoardModel). Nasłuchuje także zdarzenia modelu DOM
 * i tłumaczy kliknięcia na współrzędne.
 * canvas obiekt płótna używany do rysowania
 */
function Game(canvas) {
	this._boardRect = null;
	this._canvas = canvas;
	this._ctx = canvas.getContext("2d");
	this._boardModel = new BoardModel();

	this._boardRenderer = new BoardRenderer(this._ctx, this._boardModel);
	this.handleResize();
}

_p = Game.prototype;


_p.handleClick = function(x, y) {

	var column = Math.floor((x - this._boardRect.x)/this._boardRect.cellSize);


	var turn = this._boardModel.makeTurn(column);


	if (turn.status != BoardModel.ILLEGAL_TURN) {
		this._boardRenderer.drawToken(turn.x, turn.y);
	}
	
	if (turn.status == BoardModel.WIN) {
		
		alert("Gratulacje wygranej! "+turn.piece);
		if(typ_gry==0)
		{
			this._reset();
		}
		else if(typ_gry==2)
		{
			if(ilosc_graczy_p==2)
			{
				ilosc_graczy_p--;
				przygotowanie_gry_dalej(turn.piece);
				przywroc_ustawienia();
				this._reset();
				var d=sprawdz_czy_ktos_nie_wygral_partii(turn.piece);
				if(d)
				{
					this._reset();
				}
			}
			else
			{
				ilosc_graczy_p--;
				przygotowanie_gry_dalej(turn.piece);
			}
		}
	}


	if (turn.status == BoardModel.DRAW) {
		alert("Remis!");
		this._reset();
	}
};

/**
 * Resetowanie planszy
 */
_p._reset = function() {
	this._clearCanvas();
	this._boardModel.reset();
	this._boardRenderer.repaint();
};

/**
 * 
 * 
 */
_p.handleResize = function() {
	this._clearCanvas();
	this._boardRect = this._getBoardRect();
	this._boardRenderer.setSize(this._boardRect.x, this._boardRect.y, this._boardRect.cellSize);
	this._boardRenderer.repaint();
};

/**
 * Pobiera optymalne położenie i rozmiar planszy
 * obiekt zawierający optymalne położenie i rozmiar planszy
 * {
 * 		x: współrzędna x lewego górnego wierzchołka planszy
 * 		y: współrzędna y lewego górnego wierzchołka planszy
 * 		cellSize: optymalny rozmiar komórki (w pikselach)
 * }
 */
_p._getBoardRect = function() {
    var cols = this._boardModel.getCols();
    var rows = this._boardModel.getRows();
	var cellSize = Math.floor(
			Math.min(this._canvas.width/cols, this._canvas.height/rows));
	
	var boardWidth = cellSize*cols;
	var boardHeight = cellSize*rows;

	return {
		x: Math.floor((this._canvas.width - boardWidth)/2),
		y: Math.floor((this._canvas.height - boardHeight)/2),
		cellSize: cellSize
	}
};

/**
 * Czyści tło płótna. Jeśli chcesz narysować coś w tle planszy - zrób to w tej funkcji.
 */
_p._clearCanvas = function() {
	this._ctx.fillStyle = "white";
	this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
};