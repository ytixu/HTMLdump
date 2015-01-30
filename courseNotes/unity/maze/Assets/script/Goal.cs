using UnityEngine;
using System.Collections;

public class Goal : MonoBehaviour {
	public float speed = 0.01f;
	public GameObject colliderBox;
	private bool lift = false;
	private MazeWall platform;


	// Update is called once per frame
	void Update () {
		if (lift){
			platform.transform.localPosition += new Vector3(0,speed,0);
			if (platform.transform.localPosition.y >= 1){
				lift = false;
				colliderBox.transform.localScale = Vector3.zero;
			}
		}
	}

	public void setPlatform(MazeWall o){
		platform = o;
		transform.parent = platform.transform;
		transform.localPosition = Vector3.zero;
		transform.localScale = new Vector3 (0.5f, 10, 0.5f);
	}

	void OnTriggerEnter(Collider collider){
		if (collider.tag == "Player"){
			lift = true;
			transform.localScale = Vector3.zero;
			colliderBox.transform.parent = platform.transform;
			colliderBox.transform.localPosition = Vector3.zero;
			colliderBox.transform.localScale = new Vector3 (1,10,1);
		}
	}
}
