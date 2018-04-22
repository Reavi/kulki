/**
 * Widok planszy - klasa odpowiedzialna za rysowanie stanu gry
 * context dwuwymiarowy kontekst do rysowania
 * model model planszy, z którego korzystamy
 */
function BoardRenderer(context, model) {
	this._ctx = context;
	this._model = model;
    
    // Zapisz dla wygody
    this._cols = model.getCols();
    this._rows = model.getRows();

	// lewy górny wierzchołek planszy
	this._x = 0;
	this._y = 0;
    
    // szerokość i wysokość prostokąta planszy
    this._width = 0;
    this._height = 0;

	// optymalny rozmiar komórki planszy
	this._cellSize = 0;
}

_p = BoardRenderer.prototype;


/**
 * Odrysowuje całą planszę.
 */
_p.repaint = function() {
    this._ctx.save();
    this._ctx.translate(this._x, this._y);
    this._drawBackground();
	this._drawGrid();
    this._ctx.restore();
    
	for (var i = 0; i < this._cols; i++) {
		for (var j = 0; j < this._rows; j++) {
			this.drawToken(i, j);
		}
	}
};

_p._drawBackground = function() {
    var ctx = this._ctx;
    
    // Tło
    var gradient = ctx.createLinearGradient(0, 0, 0, this._height);
    gradient.addColorStop(0, "#fffbb3");
    gradient.addColorStop(1, "#f6f6b2");            
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this._width, this._height);
    
    // Rysowanie krzywych
    var co = this._width/6; // przesunięcie krzywej
    ctx.strokeStyle = "#dad7ac";
    ctx.fillStyle = "#f6f6b2";

    // Pierwsza krzywa
    ctx.beginPath();
    ctx.moveTo(co, this._height);
    ctx.bezierCurveTo(this._width + co*3, -co, 
                    -co*3, -co, this._width - co, this._height);
    ctx.fill();

    // Druga krzywa
    ctx.beginPath();
    ctx.moveTo(co, 0);
    ctx.bezierCurveTo(this._width + co*3, this._height + co, 
                    -co*3, this._height + co, this._width - co, 0);
    ctx.fill();

};

/**
 * Rysowanie siatki
 */
_p._drawGrid = function() {
	var ctx = this._ctx;
	ctx.beginPath();
	// Rysowanie linii poziomych
	for (var i = 0; i <= this._cols; i++) {
		ctx.moveTo(i*this._cellSize + 0.5, 0.5);
		ctx.lineTo(i*this._cellSize + 0.5, this._height + 0.5)
	}

	// Rysowanie linii pionowych
	for (var j = 0; j <= this._rows; j++) {
		ctx.moveTo(0.5, j*this._cellSize + 0.5);
		ctx.lineTo(this._width + 0.5, j*this._cellSize + 0.5);
	}

	// korzystamy z konturów, aby wyświetlić linie na ekranie
	ctx.strokeStyle = "#CCC";
	ctx.stroke();
};

/**
 * Rysuje pionek o określonym kolorze i położeniu
 * cellX współrzędna x komórki
 * cellY współrzędna y komórki
 */
_p.drawToken = function(cellX, cellY) {
    var ctx = this._ctx;
    var cellSize = this._cellSize;
    var tokenType = this._model.getPiece(cellX, cellY);

    // Komórka jest pusta
    if (!tokenType)
        return;

    
	var colorCode = "yellow";
	switch(tokenType) {
		case idgracza[1]:
			colorCode = color[1];
		break;
		case idgracza[2]:
			colorCode = color[2];
		break;
		case idgracza[3]:
			colorCode = color[3];
		break;
	    case idgracza[4]:
			colorCode = color[4];
		break;
		case idgracza[5]:
			colorCode = color[5];
		break;
		case idgracza[6]:
			colorCode = color[6];
		break;
	}
    
    // Środek pionka
    var x = this._x + (cellX + 0.5)*cellSize;
    var y = this._y + (cellY + 0.5)*cellSize;
    ctx.save();
    ctx.translate(x, y);
    
    // Promień pionka
    var radius = cellSize*0.4;
    
    // Środek gradientu
    var gradientX = cellSize*0.1;
    var gradientY = -cellSize*0.1;
    
    var gradient = ctx.createRadialGradient(
        gradientX, gradientY, cellSize*0.1, // koło wewnętrzne
        gradientX, gradientY, radius*1.2); // koło zewnętrzne
        
    gradient.addColorStop(0, "white"); // kolor światła
    gradient.addColorStop(1, colorCode); // kolor pionka
    ctx.fillStyle = gradient;
    
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.restore();
};

/**
 * Ustawia nowe położenie i rozmiar planszy. 
 * x współrzędna x lewego górnego wierzchołka
 * y współrzędna y lewego górnego wierzchołka
 * cellSize optymalny rozmiar komórki w pikselach
 */
_p.setSize = function(x, y, cellSize)  {
	this._x = x;
	this._y = y;
	this._cellSize = cellSize;
    this._width = this._cellSize*this._cols;
    this._height = this._cellSize*this._rows;
};