/**
 * Klasa BoardModel odpowiada za przechowywanie stanu pionków, walidację ruchów i sprawdzanie warunków zwycięstwa
 *cols liczba kolumn na planszy
 *rows liczba wierszy na planszy
 */

function BoardModel(cols, rows) {
	this._cols = cols || szerokosc;
	this._rows = rows || wysokosc;
	this._data = [];
	this._currentPlayer = idgracza[1];
	this._totalTokens = 0;
	
	this.reset();
}

/**
 * Id graczy 
 */
var idgracza=[];
for(i=0;i<7;i++)
{
	idgracza[i]=i;
}

/**
 * Stan gry po zakończeniu kolejki
 */
BoardModel.NONE = 0; // Gra toczy się dalej
BoardModel.WIN = 1; // Gracz, który wykonał ostatni ruch, wygrał!
BoardModel.DRAW = 2; // Nie ma wolnych pól - jest remis!
BoardModel.ILLEGAL_TURN = 3; // Ostatni ruch nie był prawidłowy

_p = BoardModel.prototype;

/**
 * Przywraca planszę gry do stanu początkowego: plansza jest pusta, a zaczyna gracz RED (czerwony).
 */
_p.reset = function() {
	this._data = [];
	for (var i = 0; i < this._rows; i++) {
		this._data[i] = [];
		for (var j = 0; j < this._cols; j++) {
			this._data[i][j] = idgracza[0];
		}
	}
	
	this._currentPlayer = losowanie_gracza();
	this._totalTokens = 0;
};

/**
 * Wrzuca pionek do danej kolumny. Model przechowuje informację o aktualnym graczu.
 * column indeks kolumny
 * piece identyfikator pionka (kolor)
 * obiekt {
 * 		status: stan zwycięstwa
 * 		x: współrzędna x nowego pionka (undefined jeśli ruch nie był prawidłowy)
 * 		y: współrzędna y nowego pionka (undefined jeśli ruch nie był prawidłowy)
 * 		piece: identyfikator pionka (RED lub GREEN)
 * }
 */
_p.makeTurn = function(column) {

	// Kolor pionka, który wrzucamy
	var piece = this._currentPlayer;

	// Sprawdź, czy kolumna jest prawidłowa
	if (column < 0 || column > this._cols-1) {
		return {
			status: BoardModel.ILLEGAL_TURN
		}
	}

	// Sprawdź, czy w danej kolumnie jest pusty wiersz - jeśli nie, ruch nie jest prawidłowy.
	var row = this._getEmptyRow(column);
	if (row == -1) {
		return {
			status: BoardModel.ILLEGAL_TURN
		}
	}

	// Znaleźliśmy pusty wiersz, więc możemy wrzucić pionek.
	this._totalTokens++;
	this._data[row][column] = piece;

	// Zmień aktywnego gracza
	this._toggleCurrentPlayer();

	// Zwróć informacje o ruchu wraz z nowym stanem gry (NONE, WIN lub DRAW)
	return {
		status: this._getGameState(column, row),
		x: column,
		y: row,
		piece: piece
	}
};

_p.getPiece = function(col, row) {
	return this._data[row][col];
};

/**
 * Zwraca liczbę kolumn modelu
 */
_p.getCols = function() {
    return this._cols;
};

/**
 * Zwraca liczbę wierszy modelu
 */
_p.getRows = function() {
    return this._rows;
};

/**
 * Znajduje dostępny wiersz w danej kolumnie. Jeśli jest ona pełna, zwraca -1.
 * W takiej sytuacji ruch jest traktowany jako nieprawidłowy
 * column indeks kolumny
 */
_p._getEmptyRow = function(column) {
	for (var i = this._rows - 1; i >= 0; i--) {
		if (!this.getPiece(column, i)) {
			return i;
		}
	}
	return -1;
};


/**
 * Sprawdza warunki zwycięstwa, obliczając liczbę pionków tego samego koloru w tym samym kolorze:
 * w pionie, w poziomie lub po przekątnych
 * column kolumna, w której wykonano ostatni ruch
 * row wiersz, w którym wykonano ostatni ruch
 * stan gry po wykonaniu danego ruchu
 * 	NONE jeśli stan nie uległ zmianie
 * 	WIN jeśli gracz, który wykonał ostatni ruch, właśnie wygrał
 * 	DRAW jeśli nie zostały wolne miejsca na planszy
 */
_p._getGameState = function(column, row) {
	if (this._totalTokens == this._cols*this._rows)
		return BoardModel.DRAW;

	for (var deltaX = -1; deltaX < 2; deltaX++) {
		for (var deltaY = -1; deltaY < 2; deltaY++) {
			if (deltaX == 0 && deltaY == 0)
				continue;
			var count = this._checkWinDirection(column, row, deltaX, deltaY)
					+ this._checkWinDirection(column, row, -deltaX, -deltaY) + 1;
			if (count >= ilosc_kulek) {
				return BoardModel.WIN;
			}
		}
	}
	return BoardModel.NONE;
};

/**
 * Oblicza liczbę pionków tego samego koloru w danym kierunku, zaczynając od zadanego punktu (ostatnia kolejka)
 * column kolumna początkowa
 * row wiersz początkowy
 * deltaX kierunek x sprawdzania
 * deltaY kierunek y sprawdzania
 */
_p._checkWinDirection = function(column, row, deltaX, deltaY) {
	var pieceColor = this.getPiece(column, row);
	var tokenCounter = 0;
	var c = column + deltaX;
	var r = row + deltaY;
	while(c >= 0 && r >= 0 && c < this._cols && r < this._rows &&
			this.getPiece(c, r) == pieceColor) {
		c += deltaX;
		r += deltaY;
		tokenCounter++;
	}
	return tokenCounter;
};

/**
 * Zmienia aktywnego gracza 
 */
 
 _p._toggleCurrentPlayer = function() {
var zg=this._currentPlayer;
	if(typ_gry==0)
	{
		if(zg==ilosc_graczy)
		{
			zg=1;
		}
		else
		{
			zg++;
		}
	}
	else if(typ_gry==2)
	{
		zg=zmiana_gracza_iii_gdk(zg);
	}
this._currentPlayer=zg;
	pokaz_aktualnego_gracza(this._currentPlayer);
 };
function zmiana_gracza_iii_gdk(zg)
{

	if(zg==ilosc_graczy)
	{
		
		zg=1;
	}
	else
	{
		zg++;
		
	}
	for(i=1;i<ilosc_graczy+1;i++)
	{
		if(	czy_gracz_a[i]==0 && zg==i)
		{
			zg++;
			if(zg>ilosc_graczy)
			{
				zg=1;
			}
		}
			
	}

return zg;
}
