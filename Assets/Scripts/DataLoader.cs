using UnityEngine;
using System.Collections;
using System;
     
public class DataLoader : MonoBehaviour  
{
	public string[] items;

	// Use this for initialization
	IEnumerator Start () 
	{
		WWWForm form = new WWWForm ();
		form.AddField ("pageNumberPost", 1);

		WWW itemsData = new WWW("https://shared-thing.000webhostapp.com/itemData.php", form); // Needs some time to download

		yield return itemsData;

		string itemsDataString = itemsData.text; 
		//print(itemsDataString);
		items = itemsDataString.Split(';');
		//print(GetDataValue(items[0], "amar_score:"));
		/*
		 * converting string to int
		string ss = "420";
		int counter = System.Int32.Parse (ss);
		counter++;
		print (counter);
		*/

		for(int i = 0; i < 5; i++)
		{

			print( GetDataValue(items[i], "name:") );
			print( GetDataValue(items[i], "highscore:") );
			print ("\n");
		}
	} // end of Start


	string GetDataValue(string data, string index)
	{
		string value = data.Substring(data.IndexOf (index) + index.Length);
		if( value.Contains("|") ) value = value.Remove(value.IndexOf("|") );
		return value; 
	} // end of GetDataValue


}
