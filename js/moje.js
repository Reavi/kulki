
function przygotowanie_gry_dalej(gracz)
{
wylacz_gracza(gracz);
przydziel_punkty(gracz);	
}

function wylacz_gracza(gracz)
{
	czy_gracz_a[gracz]=0;
}
function przywroc_ustawienia()
{
	for(i=1;i<ilosc_graczy+1;i++)
	{
		czy_gracz_a[i]=1;
	}
	ilosc_graczy_p=ilosc_graczy;
}
function sprawdz_czy_ktos_nie_wygral_partii(d)
{
	for(i=1;i<ilosc_graczy+1;i++)
	{
		if(punkty_graczy[i]>=ilosc_punktow)
		{
			alert("Całą partię wygrał gracz "+idgracza[i]);
			return true;
		}
	}
}

function zmien_ilosc_kulek()
{
	ilosc_kulek=document.ilosc_graczy_f.select_ilosc_kulek.value;
}
function zmien_wielkosc_planszy() 
{
	var wybor=document.ilosc_graczy_f.select_wielkosc_planszy.value;
	if(wybor==3)
	{
		szerokosc=45;
		wysokosc=15;
	}
	else if(wybor==1)
	{
		wysokosc=5;
		szerokosc=15;
	}
}
