using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class GameGUI : MonoBehaviour 
{
	public bool showWindow;
	public string windowMessage;
	public GUISkin mainSkin;
	public float windowWidth;
	public float windowHeight;
	public GUIStyle windowTextStyle;
	public float buttonWidth;
	public float buttonHeight;

	public bool showLoginLabel;
	public string loginLabelMessage;
	public GUIStyle loginLabelStyle;

	public Texture2D heartTexture;
	public float heartTextureWidth;
	public float heartTextureHeight;
	public int numOfLife; // number of heartes to be drawn

	public float digitTextureWidth;
	public float digitTextureHeight;
	public Texture2D[] digitTextures;
	public int theScore;

	private int highsocre;
	public bool isHighscore;
	public float highscoreTextureWidth;
	public float highscoreTextureHeight;
	public Texture2D highscoreTexture;
	//these textures will flicker
	public bool showFlickeringTexture;
	public bool showClockTexture;
	public bool showShieldTexture;
	public bool showDrugTexture;
	public Texture2D clockTexture;
	public Texture2D drugTexture;
	public Texture2D shieldTexture;

	public float pickUpWidth;
	public float pickUpHeight;
	private int noOfPickedUp;

	public int bark;
	private bool barkInc;
	public string loggedinUsername;

	void Awake()
	{
		StartCoroutine(Flicker());
		//DontDestroyOnLoad(transform.gameObject);
	}

	public void LoadUserData()
	{
		loggedinUsername = PlayerPrefs.GetString ("username", "null");
		highsocre = PlayerPrefs.GetInt("highScore");
	}

	void Start()
	{
		showFlickeringTexture = true;
		showClockTexture = false;
		showDrugTexture = false;
		showShieldTexture = false;
		noOfPickedUp = 0;

		showWindow = false;
		windowMessage = "";
		bark = 50;
		barkInc = false;

		LoadUserData();

		if(loggedinUsername == "null") loginLabelMessage = "not logged in";
		else loginLabelMessage = "HELLO, "+loggedinUsername;

		loginLabelMessage += "\nHS: "+highsocre;

		showLoginLabel = true;
		theScore = 0;
		isHighscore = false;
		/*
		List<int> lst = GetDigits (12345);
		for (int i = 0; i < lst.Count; i++) {
			print(lst[i]);
				}
		*/

	} // end of Start
	private bool calledCoroutine = false;

	void OnGUI()
	{
		//useGUILayout = true;
		GUI.skin = mainSkin;
		//if (showWindow)  GUI.Window (2, new Rect (Screen.width / 2 - windowWidth / 2, Screen.height / 2 - windowHeight / 2, windowWidth, windowHeight), Yoyo, "NOTICE");
		//	GUI.BringWindowToFront(2); GUI.FocusWindow(2);
		
		if (showWindow) BuildWindow (); //GUI.Box (new Rect (0, 0, 100, 100), windowMessage);
		if (showLoginLabel) GUI.Box ( new Rect(0, 0, 300, 80), loginLabelMessage );
		
		for (int i = 1; i <= numOfLife; i++) 
		{
			GUI.Label (new Rect (Screen.width - heartTextureWidth*i, 0, heartTextureWidth, heartTextureHeight), heartTexture); 
		}

		//GUI.Label (new Rect (0, 0, digitTextureWidth, digitTextureHeight), digitTextures [0]);
		// Draw the score
		List<int> lst = GetDigits (theScore);
		for (int i = 0; i < lst.Count; i++) 
		{
			GUI.Label (new Rect (Screen.width - digitTextureWidth*(i+1), heartTextureHeight, 
			                     digitTextureWidth, digitTextureHeight), 
			           digitTextures[ lst[i] ] ); 
		} // end of for
		//if high score
		if(isHighscore) GUI.Label (new Rect (Screen.width - highscoreTextureWidth, digitTextureHeight + heartTextureHeight, 
		                                     highscoreTextureWidth, highscoreTextureHeight), highscoreTexture); 

		/*
		if(barkInc) bark++;
		else bark--;
		if(bark >= 50) barkInc = false;
		else if(bark <= 0) barkInc = true;

		if(bark > 10 && bark < 40) GUI.Label(new Rect(0, 0, 100, 100), drugTexture);
		*/
		//if(!calledCoroutine) { StartCoroutine(Flicker());  calledCoroutine = true; }
		if(showFlickeringTexture)
		{
			if(showDrugTexture) 
				GUI.Label(new Rect(0, Screen.height - pickUpHeight, pickUpHeight, pickUpWidth), drugTexture);
			if(showClockTexture) 
				GUI.Label(new Rect(0+pickUpWidth, Screen.height - pickUpHeight, pickUpHeight, pickUpWidth), clockTexture);
			if(showShieldTexture) 
				GUI.Label(new Rect(0+pickUpWidth*2, Screen.height - pickUpHeight, pickUpHeight, pickUpWidth), shieldTexture);
		} // end of if
	} // end of OnGUI
	
	void BuildWindow()
	{
		GUI.BeginGroup(new Rect( Screen.width/2 - windowWidth/2, Screen.height/2 - windowHeight/2, windowWidth, windowHeight));
		GUI.Box (new Rect (0,0,windowWidth, windowHeight), windowMessage);
		
		if(GUI.Button(new Rect( 30, 60, buttonWidth, buttonHeight ),"RESTART"))
		{
			//print ("pressed RESTART");
			Application.LoadLevel("Game");
		} // end of if
		
		if(GUI.Button(new Rect(150, 60, buttonWidth, buttonHeight), "MAIN MENU") )
		{
			//print("pressed MAIN MENU");
			//Application.Quit();
			Application.LoadLevel("register");
		}
		GUI.EndGroup(); 
	} // end of BuildWindow

	List<int> GetDigits(int number)
	{
		int temp = number;
		List<int> digits = new List<int>();
		if (number == 0) 
		{
			digits.Add(0);
			return digits;
		}
		while (temp != 0) 
		{
			digits.Add(temp%10);
			temp = temp / 10;
		} // end of while
		return digits;
	} // end of for

	/*
	void Yoyo(int winID)
	{
		//GUI.Label(new Rect(0, 10, windowWidth, windowHeight), windowMessage, windowTextStyle);
		GUI.BringWindowToFront(winID); 
		GUI.FocusWindow(winID);
		if (GUI.Button (new Rect (windowWidth / 2 - buttonWidth / 2, windowHeight - buttonHeight + 50, buttonWidth, buttonHeight), "OKAYss")) 
		{
			showWindow = false;
			print ("got a click");
		} // end of if
		GUI.UnfocusWindow();
	} // end of Yoyo
*/
	IEnumerator Flicker()
	{
		while(true)
		{
			showFlickeringTexture = !showFlickeringTexture;
			yield return new WaitForSeconds(0.10f);
		}// end of while
	}
} // end of class
