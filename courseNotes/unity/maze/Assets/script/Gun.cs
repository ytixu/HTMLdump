using UnityEngine;
using System.Collections;

public class Gun : MonoBehaviour {

	public GameObject load;

	public Vector3 getNuzzlePos(){
		return transform.FindChild ("nuzzle").position;
	}

	public void loadBullet(Bullet b){
		load.renderer.material = b.renderer.material;
	}
}
