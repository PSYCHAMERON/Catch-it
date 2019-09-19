using UnityEngine;
using System.Collections;
 
public class Register : MonoBehaviour 
{
	private string username;
	private string password;
	private string insertUserResult;
	private string loginResult;
	private string windowMessage;
	private bool usernameWarning;
	private bool passwordWarning;
	private bool showWindow;
	private bool processing;
	private int mode; // mode 1 = sign up, mode 2 = login, mode 3 = leaderboard
	private string loggedinUsername;
	private int loggedinHighscore;
	private string[] items;

	public GUIStyle warningStyle;
	public GUIStyle windowTextStyle;
	public Texture background;
	public GUISkin mainSkin;

	public float groupWidth;
	public float groupHeight;

	public float textPassWidth; // width of the text and password widht
	public float textPassHeight;

	public float buttonWidth;
	public float buttonHeight;

	public float windowWidth;
	public float windowHeight;

	void Start()  
	{
		/*
		int valll = 0;
		int.TryParse("1234567890", out valll);
		print(valll);
		*/
		username = ""; 
		password = "";
		insertUserResult = "";
		loginResult = "";
		mode = 2;
		//loggedinUsername = "null";

		processing = false;
		showWindow = false;
		usernameWarning = false;
		passwordWarning = false;
		LoadUserData();
		if(loggedinUsername != "null") UploadHS();// if logged in, upload the local high score to the database
	} // end of Start

	void OnGUI()
	{


		float xOffset = groupWidth / 2 - textPassWidth / 2;
		//static string PasswordField(Rect position, string password, char maskChar, int maxLength, GUIStyle style);
		//static string TextField(Rect position, string text, int maxLength, GUIStyle style);
		GUI.skin = mainSkin;
		if(!processing) ButtonControl();
		//GUI.DrawTexture (new Rect (0, 0,  Screen.width, Screen.height ), background );

		if(loggedinUsername == "null") GUI.Label(new Rect(0, 0, 200, 100), "NOT LOGGED IN");
		else GUI.Box(new Rect(0, 0, 350, 50), "HELLO, "+loggedinUsername+", HS: "+loggedinHighscore);
		if(mode != 3) {
			GUI.BeginGroup (new Rect (Screen.width/2 - groupWidth / 2, Screen.height/2 - groupHeight / 2, groupWidth, groupHeight)); 
			//GUI.Box(new Rect(0, 0, 500, 500), "flash");

			if(!processing){
				GUI.Label (new Rect ( xOffset, (float)(groupHeight * 0.2), textPassWidth, textPassHeight ), "USERNAME"); // GUI.Label uses texture
				username = GUI.TextField (new Rect ( xOffset, (float)(groupHeight * 0.24), textPassWidth, textPassHeight), username, 10); // input username

				GUI.Label (new Rect ( xOffset, (float)(groupHeight * 0.35), textPassWidth, textPassHeight ), "PASSWORD"); // GUI.Label uses texture
				password = GUI.PasswordField(new Rect(xOffset, (float)(groupHeight * 0.39), textPassWidth, textPassHeight), password, '*', 15) ; // input password
				//warnings...
				if( !UsernameIsValid() ) 
				{
					GUI.Label(new Rect( xOffset + textPassWidth + 10, (float)(groupHeight * 0.24), 600, 50), "TOO SHORT", warningStyle);
				} // end of if
				if ( !PasswordIsValid() )
				{
					GUI.Label(new Rect( xOffset + textPassWidth + 10, (float)(groupHeight * 0.39), 600, 50), "TOO SHORT", warningStyle);
				} // end of else if
			}
			// mode 1 = sign up, mode 2 = login
			string buttonName = "";
			if(mode == 1) buttonName = "SIGN UP";
			else if(mode == 2) buttonName = "LOGIN";

			if (GUI.Button (new Rect ( groupWidth/2 - buttonWidth/2, (float)(groupHeight * 0.50), buttonWidth, buttonHeight), buttonName )  ) 
			{
				if( UsernameIsValid() && PasswordIsValid() )
				{
					//print("clicked");
					if(mode == 1) CreateUser(username, password); // try to create the new user and get the result
					else if(mode == 2) Login(username, password);
				} // end of else
			} // end of if
			GUI.EndGroup ();
	}
		if(mode ==3)
		{

			if(!processing) ShowLeaderboardPage();
		}
		
		if(showWindow) GUI.Window (1, new Rect (Screen.width / 2 - windowWidth / 2, Screen.height / 2 - windowHeight/2, windowWidth, windowHeight), Yoyo, "NOTICE");
	} // end of OnGUI

	void Yoyo(int winID)
	{

		//GUI.BeginGroup (new Rect (Screen.width / 2 - windowWidth / 2, Screen.height / 2 - windowHeight/2, windowWidth, windowHeight));
		//GUI.Label (new Rect (0, 100, 200, 50), "dsa");
		GUI.Label(new Rect(0, 10, windowWidth, windowHeight), windowMessage, windowTextStyle);

		if(!processing)
		if (GUI.Button (new Rect (windowWidth / 2 - buttonWidth / 2, windowHeight - 100 + 50, buttonWidth, 100), "OKAY")) 
		{
			showWindow = false;
			username = "";
			password = "";
		} // end of if

		//GUI.EndGroup ();
	} // end of Yoyo

	public bool UsernameIsValid()
	{
		if (username.Length < 5) 
		{
			return false;
		} // end of if
		return true;
	} // end of function
	public bool PasswordIsValid()
	{
		if (password.Length < 8) 
		{
			return false;
		} // end of if
		return true;
	} // end of function


	/*
	 * 
	 * 
	 * 
	*/

	public void UploadHS()
	{
		string setHSURL = "http://shared-thing.000webhostapp.com/setHS.php";
		WWWForm form = new WWWForm();
		form.AddField("usernamePost", loggedinUsername);
		form.AddField("highscorePost", loggedinHighscore);

		WWW setHSPage = new WWW(setHSURL, form);
		StartCoroutine(WaitForSave(setHSPage));
	}

	public IEnumerator WaitForSave(WWW www)
	{
		showWindow = true;
		windowMessage = "UPDATING DATABASE";
		processing = true;
		yield return www;
		processing = false;
		//print ("success...");
		string result = www.text;

		if(result == "success")
		{
			windowMessage = "DATABASE UPDATED";
		}
		else
		{
			windowMessage = "COULD NOT CONNECT";
		}
	}

	public void Login(string username1, string password1)
	{
		string loginURL = "https://shared-thing.000webhostapp.com/login.php";
		WWWForm form = new WWWForm();
		form.AddField("usernamePost", username1);
		form.AddField("passwordPost", password1);
		//print ("this is working");
		WWW loginPage = new WWW(loginURL, form);
		StartCoroutine(WaitForLogin(loginPage));
	}

	public IEnumerator WaitForLogin(WWW www)
	{
		showWindow = true;
		windowMessage = "PLEASE WAIT";
		
		processing = true;
		yield return www;
		processing = false; 
		
		loginResult  = www.text; // get the result
		//print ("RESULT:"+www.text);
		showWindow = true;			
		
		if(loginResult == "success")
		{
			//print("successfully created an account");
			windowMessage = "SUCCESSFULLY LOGGED IN";
			loggedinUsername = username;
			SaveUserData(username, 0);
		} // end of if
		else if(loginResult == "mismatch")
		{
			//print("username already exists");
			windowMessage = "WRONG USERNAME/PASSWORD";
		} // end of else if
		else
		{
			//print("error creating account");
			windowMessage = "COULD NOT CONNECT";
		} // end of else
	}

	public void CreateUser(string username, string password)
	{
		string insertUserURL = "https://shared-thing.000webhostapp.com/InsertUser.php";
	
		WWWForm form = new WWWForm ();
		form.AddField ("usernamePost", username);
		form.AddField ("passwordPost", password);
			
		WWW insertUserPage = new WWW (insertUserURL, form); // submit to the page
		StartCoroutine(WaitForRequest(insertUserPage));
	} // end 

	public IEnumerator WaitForRequest(WWW www)
	{
		showWindow = true;
		windowMessage = "PLEASE WAIT";

		processing = true;
		yield return www;
		processing = false; 

		insertUserResult  = www.text; // get the result
		//print ("RESULT:"+www.text);
		showWindow = true;			

		if(insertUserResult == "success")
		{
			//print("successfully created an account");
			windowMessage = "SUCCESS! HELLO, "+username;
			loggedinUsername = username;
			SaveUserData(username, 0);
		} // end of if
		else if(insertUserResult == "duplicate")
		{
			//print("username already exists");
			windowMessage = "USERNAME ALREADY EXISTS\nTRY SOMETHING ELSE";
		} // end of else if
		else
		{
			//print("error creating account");
			windowMessage = "COULD NOT CONNECT";
		} // end of else

	} // end
	int pageNum;

	public void ButtonControl()
	{
		float xOffset = 20;
		float yOffset = 50;

		GUI.BeginGroup(new Rect(0, 15, buttonWidth + xOffset*2, Screen.height) );

		if( GUI.Button(new Rect(xOffset, yOffset, buttonWidth, buttonHeight), "LOGIN") )
		{
			mode = 2;
		}// end of if
		if( GUI.Button(new Rect(xOffset, yOffset*2, buttonWidth, buttonHeight), "SIGN UP") )
		{
			mode =1;
		} // end of if
		if( GUI.Button(new Rect(xOffset, yOffset*3, buttonWidth, buttonHeight), "PLAY") )
		{
			Application.LoadLevel("Game");
		} // end of if
		if( GUI.Button(new Rect(xOffset, yOffset*4, buttonWidth, buttonHeight), "LBOARD") )
		{
			mode = 3;
			pageNum = 0;
			Leaderboard(pageNum);
		} // end of if

		if( GUI.Button(new Rect(xOffset, yOffset*6, buttonWidth, buttonHeight), "QUIT") )
		{
			Application.Quit();
		} // end of if

		if( GUI.Button(new Rect(xOffset, yOffset*5, buttonWidth, buttonHeight), "LOGOUT") )
		{
			loggedinUsername = "null";
		} // end of if

		GUI.EndGroup();
		if(mode == 3)
		{
			if(GUI.Button(new Rect(Screen.width-500, 300, buttonWidth, buttonHeight), "PREV"))
			{
				print("clicked prev");
				if(pageNum != 0) pageNum--;
				Leaderboard(pageNum);
			}
			if(GUI.Button(new Rect(Screen.width - buttonWidth, 300, buttonWidth, buttonHeight), "NEXT"))
			{
				print ("clicked next");
				pageNum++;
				Leaderboard(pageNum);
			}
		
		} // end of if
		
	} // end of buttonControl

	public void LoadUserData()
	{
		loggedinUsername = PlayerPrefs.GetString ("username", "null");
		loggedinHighscore = PlayerPrefs.GetInt("highScore");
	}

	public void SaveUserData(string amarUsername, int amarHighscore)
	{
		PlayerPrefs.SetString("username", amarUsername);
		//PlayerPrefs.SetInt("highScore", amarHighscore);
	}

	public void Leaderboard(int pageNumber)
	{
		WWWForm form = new WWWForm ();
		form.AddField ("pageNumberPost", pageNumber);
		
		WWW itemsData = new WWW("https://shared-thing.000webhostapp.com/itemData.php", form);
		StartCoroutine(WaitForLeaderboard(itemsData));

	}

	public IEnumerator WaitForLeaderboard(WWW www)
	{
		showWindow = true;
		windowMessage = "PLEASE WAIT";
	
		processing = true;
		yield return www;
		processing = false; 
		showWindow = false;

		// show the page
		string itemsDataString = www.text; 

		//print(itemsDataString);
		if (itemsDataString == "") 
		{
			//print ("could not connect");
			showWindow = true;
			windowMessage = "COULD NOT CONNECT";
		}
		//print(itemsDataString);
		items = itemsDataString.Split(';');
		//print(itemsDataString);
	}

	public void ShowLeaderboardPage()
	{
		string msg = "";
	//	print(items.Length);
		for(int i = 0; i < items.Length; i++)
		{
			msg = "NAME: " + GetDataValue(items[i], "name:") + ", HS: " + GetDataValue(items[i], "highscore:");
			GUI.Box(new Rect(Screen.width - 500, 50*i, 500, 50), msg);
			 
			//print(msg);
		} // end of for
	}

	string GetDataValue(string data, string index)
	{
		string value = data.Substring(data.IndexOf (index) + index.Length);
		if( value.Contains("|") ) value = value.Remove(value.IndexOf("|") );
		return value; 
	} // end of GetDataValue

}
