using UnityEngine;
using System.Collections;

public class Gun : MonoBehaviour {

	public GameObject load;
	public Material trans;

	public Vector3 getNuzzlePos(){
		return transform.FindChild ("nuzzle").position;
	}

	public void loadBullet(Bullet b){
		load.renderer.material = b.renderer.material;
	}

	public void disload(){
		load.renderer.material = trans;
	}
}
