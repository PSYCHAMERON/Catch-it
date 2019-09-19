using UnityEngine;
using System.Collections;

public class ShowTexture : MonoBehaviour 
{
	public Texture bilad;
	public GUISkin mainSkin;
	public GUIStyle newStyle;

	void Start () 
	{
		//bilad = Resources.Load ("Textures/blood") as Texture;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnGUI()
	{
		if (!bilad) 
		{
			Debug.Log ("no texture");
			return;
		} // end of if
		//GUI.DrawTexture (new Rect (0, 0, 100, 100), bilad);

		GUI.Label (new Rect (200, 40, 100, 20), "this is some text", newStyle);

		//GUI.Label (new Rect (200, 100, 100, 200), bilad); // GUI.Label uses texture

		GUI.skin = mainSkin;

		GUI.Box (new Rect (10, 10, 100, 90), bilad);

		if (GUI.Button (new Rect (20, 40, 80, 20), "Level1")) 
		{
			print ("button 1 clicked");
		}

		if (GUI.Button (new Rect (20, 70, 80, 20), "Level2")) 
		{
			print ("button 2 clicked");
		}

	} // end of OnGUI
}
