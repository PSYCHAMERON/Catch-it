using UnityEngine;
using System.Collections;

public class Datasavingloading : MonoBehaviour 
{

	// Use this for initialization
	void Start () 
	{
		//PlayerPrefs.SetInt ("highscore", 420);	
		print (PlayerPrefs.GetInt ("highsgcore"));
	}
	
	// Update is called once per frame
	void Update () 
	{
	
	}
}
