using UnityEngine;
using System.Collections;

public class GameLevelManager : MonoBehaviour {
	public CubiCloud[] clouds;
	public GameManager manager;

	// Use this for initialization
	void Start () {
		generate ();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	private void generate(){
		foreach (CubiCloud c in clouds){
			manager.cloud = c;
			manager.distributeCubes ();
		}
	}
}
