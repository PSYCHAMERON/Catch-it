#pragma strict

function Start () 
{

}

function Update () 
{

}

function OnGUI()
{
	if(GUI.Button( new Rect(Screen.width/2, Screen.height/2, 100, 50), "Play" ) )
	{
		Application.LoadLevel("Game");
	}
}