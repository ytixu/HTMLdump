using UnityEngine;
using System.Collections;

public class Cubi : MonoBehaviour {
	public int value = 0;
	public bool isBomb = false;
	public bool bomb{
		get { return isBomb; }
		set { isBomb = value; }
	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void newLocation(int i, int j, int k, int size){
		transform.localPosition = new Vector3 (size * i, 
		                                       size * j,
		                                       size * k);
	}
}
