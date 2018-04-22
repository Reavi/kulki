var game;
var ilosc_punktow=20;
var ilosc_graczy=2;
var punkty_graczy=[];
var ilosc_graczy_p=2;
var szerokosc=30;
var wysokosc=10;
var color_zablokowany=[];
var czy_gracz_wybral_kolor=[];
for(i=1;i<7;i++)
{
punkty_graczy[i]=0;
color_zablokowany[i]=0;
czy_gracz_wybral_kolor[i]=0;
}
var color=[];
var typ_gry=0;
var ilosc_kulek=4;
var czy_gracz_a=[];
for(i=1;i<ilosc_graczy+1;i++)
{
czy_gracz_a[i]=1;
}
function zmien_typ_gry()
{
typ_gry=document.ilosc_graczy_f.selec_typ_gry.value;

}

function zmiana_disable(liczba)
{
id="select"+liczba;
var x = document.getElementById(id).options[0].disabled = true;
}

function ilosc_graczy_s()
{
ilosc_graczy=document.ilosc_graczy_f.ilosc_graczy_select.value;
ilosc_graczy_p=ilosc_graczy;
pokazanie_menu_do_kolorow_kulek(ilosc_graczy);
}
function sprawdz_kolory()
{
var tab_p_k=[];
var tablica_kolor=["","red","green","blue","purple","gray","brown","black"];
var a=1;
for(i=1;i<7;i++)
{
	
	if(color_zablokowany[i]==0)
	{
		tab_p_k[a]=tablica_kolor[i];
		a++;
	}
}
var r=1;
for(i=1;i<7;i++)
{
	if(czy_gracz_wybral_kolor[i]==0)
	{
		color[i]=tab_p_k[r];
		r++
	}
}

}

function pokaz_potrzebne(){
	document.getElementById("agp").style.visibility = "visible";
	if(typ_gry==2){
		document.getElementById("wyniki").style.visibility = "visible";
	}

}

function pokazanie_menu_do_kolorow_kulek(ig)
{	
	igg=parseInt(ig);
	for(i=1;i<igg+1;i++)
	{
	ip="kolor"+i;
	document.getElementById(ip).style.visibility = "visible";
	}
	document.getElementById("przycisk").style.visibility = "visible";
	for(i=igg+1;i<7;i++)
	{
	ip="kolor"+i;
	document.getElementById(ip).style.visibility = "hidden";
	}
}

function ukryj_niepotrzebne()
{
	document.getElementById("box_menu").style.visibility = "hidden";
	igg=6;
	for(i=1;i<igg+1;i++)
	{
		ip="kolor"+i;
		document.getElementById(ip).style.visibility = "hidden";
	}
		document.getElementById("przycisk").style.visibility = "hidden";
}

function kolor_g(id)
{
var idd="select"+id;
var x = document.getElementById(idd).selectedIndex;
var tablica_kolorw=["","red","green","blue","purple","gray","brown","black"];
color[id]=tablica_kolorw[x];
color_zablokowany[x]=1;
zablokuj_kolory_w_select(id,x);
}

function zablokuj_kolory_w_select(id,x)
{
	czy_gracz_wybral_kolor[id]=1;
	for(i=1;i<7;i++)
	{
		var idd="select"+i;
		var r = document.getElementById(idd).options[x].disabled = true;
		
	}
}

function pokaz_aktualnego_gracza(a)
{
var tab=["","Pierwszy","Drugi","Trzeci","Czwarty","Piaty","Szosty"];
document.getElementById("ag").innerHTML=tab[a];
}
function przydziel_punkty(gracz)
{
	punkty_graczy[gracz]=punkty_graczy[gracz]+ilosc_graczy_p;
	var id="wynikgracz"+gracz;
	var d=punkty_graczy[gracz];
	document.getElementById(id).innerHTML=d;

}	
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
function losowanie_gracza()
{
var d = rand(1,ilosc_graczy);
	pokaz_aktualnego_gracza(d);
	alert("Zaczyna gracz "+d);
	return idgracza[d];

	
}
function rand( min, max ){
    min = parseInt( min, 10 );
    max = parseInt( max, 10 );

    if ( min > max ){
        var tmp = min;
        min = max;
        max = tmp;
    }

    return Math.floor( Math.random() * ( max - min + 1 ) + min );
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
