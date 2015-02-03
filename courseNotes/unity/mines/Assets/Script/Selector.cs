using UnityEngine;
using System.Collections;

public class Selector : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void showInCubi(Cubi c){
		transform.parent = c.transform;
		renderer.enabled = true;
	}

	public void hide(){
		renderer.enabled = false;
	}
}
