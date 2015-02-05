using UnityEngine;
using System.Collections;

public class CubiCloud: MonoBehaviour {
	// size of the 	
	public int width;
	public int height;
	public int depth;
	// probabilities
	public int nBombs;
	public float pCubi;
	public float pGold;
	// size of the Cubi
	public int cubiSize;
	// size of player step
	public int stepSize;
	// radius of explosion
	public int radius;
	
	// Use this for initialization
	public void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}


	/**
	 * Methods for setting up the bombs.
	 */

	public class cellValue{
		public int val;
		public bool isBomb;
		public cellValue(){
			val = 0;
			isBomb = false;
		}
	}
	// assums no out of bound
	private void setBomb(int a, int b, int c, cellValue[,,] grid){
		for (int i=a-1; i<a+2; i++){
			for (int j=b-1; j<b+2; j++){
				for (int k=c-1; k<c+2; k++){
					if (grid[i,j,k] == null) grid[i,j,k] = new cellValue();
					grid[i,j,k].val += 1;
				}
			}
		}
		//print (a+" " + b + " " + c);
		grid[a,b,c].isBomb = true;
	}
	// center is 3x3x3
	public bool isCenter(int i, int j, int k){
		if (Mathf.Abs(i-width/2) > 2 || 
		    Mathf.Abs(j-height/2) > 2 || 
		    Mathf.Abs(k- depth/2) > 2){
			return false;
		}
		//print (i + " " + j + " " + k);
		return true;
	}
	
	// player starts at the center so 
	// do not place bomb at center 
	public cellValue[,,] distributeBombs(){
		cellValue[,,] grid = new cellValue[width, height, depth];
		int i, j, k;
		int tries = 0;
		for (int n=0; n<nBombs && tries < 10;){
			tries += 1;
			i = Random.Range(1,width-1);
			j = Random.Range (1,height-1);
			k = Random.Range(1,depth-1);
			if (isCenter(i,j,k)) continue;
			if (grid[i,j,k] == null) grid[i,j,k] = new cellValue();
			if (!grid[i,j,k].isBomb){
				setBomb(i,j,k,grid);
				n++;
				tries=0;
			}
		}
		return grid;
	}
	
}
