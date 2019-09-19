using UnityEngine;
using System.Collections;

public class DataInserter : MonoBehaviour 
{

	// Use this for initialization
	void Start () 
	{
		CreateUser ("pankha", "kkkuuulll");
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void CreateUser(string username, string password)
	{
		WWWForm form = new WWWForm ();
		form.AddField ("usernamePost", username);
		form.AddField ("passwordPost", password);


		WWW www = new WWW ("http://localhost/test_db/insertUser.php", form);

	} // end 
}
