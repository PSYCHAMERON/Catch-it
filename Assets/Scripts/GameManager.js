#pragma strict

internal var showMenu : boolean = false;


function Start () 
{
	Screen.showCursor = false;
}

function Update () 
{
 	//if(Input.GetKeyDown("escape") )
 	
 	if( !Screen.showCursor ) print("showcursor false");
}

function OnGUI()
{
		GUI.BeginGroup(Rect(Screen.width / 2 - 50, Screen.height / 2 - 45, 100, 90));
		
			GUI.Box(Rect(0, 0, 100, 90), "Menu");
			
			if (GUI.Button (Rect (10, 30, 80, 20), "Quit")) 
			{
				//print ("button 1 clicked");
			}

			if (GUI.Button (Rect (10, 60, 80, 20), "Resume")) 
			{
				//print ("button 2 clicked");
			}// end of if
			
		GUI.EndGroup();

}