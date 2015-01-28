using UnityEngine;
using System.Collections;

public class Bullet : MonoBehaviour {
	private float speed = 0.3f;

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		transform.localPosition += transform.forward*speed;
	}

	public void initTransform(){
		transform.localScale = new Vector3 (0.5f, 0.25f, 0.5f);
		transform.localPosition = new Vector3(0.5f, 0.55f, 1f);
	}
}
