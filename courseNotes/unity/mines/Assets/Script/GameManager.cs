using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour {

	public Cubi cubi;
	public Player player;
	public CubiCloud cloud;
	public Material[] tileColor;

	private Cubi[,,] matrix;

	private class cellValue{
		public int val;
		public bool isBomb;
		public cellValue(){
			val = 0;
			isBomb = false;
		}
	}

	private int[] currentPos;

	// Use this for initialization
	void Start () {

	}

	private bool inBound(Player.Position p){
		if (p.i > -1 && p.i < cloud.width && p.j > -1 && p.j < cloud.height &&
		    p.k > -1 && p.k < cloud.depth){
			return true;
		}
		return false;
	}

	private Cubi getCubi(Player.Position p){
		print (p.toString ());
		if (inBound(p)){
			return matrix [p.i,p.j,p.k];
		}else{
			return null;
		}
	}

	private bool canMove(int direction){
		Player.Position p = player.getNextStep (direction);
		if (getCubi(p) == null){
			player.newLocation(p);
			return true;
		}
		return false;
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown(KeyCode.UpArrow)){
			canMove(1);
		}else if (Input.GetKeyDown(KeyCode.DownArrow)){
			canMove (-1);
		}else if (Input.GetKeyDown(KeyCode.D)){
			player.Jump();
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
		grid[a,b,c].isBomb = true;
	}

	// center is 3x3x3
	private bool isCenter(int i, int j, int k){
		if (Mathf.Abs(i-cloud.width/2) > 2 || 
		    Mathf.Abs(j-cloud.height/2) > 2 || 
		    Mathf.Abs(k- cloud.depth/2) > 2){
			return false;
		}
		//print (i + " " + j + " " + k);
		return true;
	}

	// player starts at the center so 
	// do not place bomb at center 
	private cellValue[,,] distributeBombs(){
		cellValue[,,] grid = new cellValue[cloud.width, cloud.height, cloud.depth];
		int i, j, k;
		int tries = 0;
		for (int n=0; n<cloud.nBombs && tries < 10;){
			tries += 1;
			i = Random.Range(1,cloud.width-1);
			j = Random.Range (1,cloud.height-1);
			k = Random.Range(1,cloud.depth-1);
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

	private Cubi drawCubi(int i, int j, int k, cellValue[,,] grid){
		Cubi temp = GameObject.Instantiate(cubi) as Cubi;
		temp.transform.parent = cloud.transform;
		temp.transform.localScale = new Vector3 (cloud.cubiSize, cloud.cubiSize, cloud.cubiSize);
		temp.newLocation(i,j,k,cloud.cubiSize);
		if (grid[i,j,k] != null){
			temp.value = grid [i, j, k].val;
			temp.bomb = grid [i, j, k].isBomb;
		}
		if (temp.value < 12)
				temp.renderer.material = tileColor [temp.value];
		return temp;
	}
		
	// draw the cubes
	public void distributeCubes(){
		matrix = new Cubi[cloud.width, cloud.height, cloud.depth];
		// set up the bombs
		cellValue[,,] grid = distributeBombs ();
		// player at the center
		player.Cloud = cloud;
		player.transform.parent = cloud.transform;
		player.newLocation(cloud.width/2, cloud.height/2, cloud.depth/2);
		drawCubi(cloud.width/2, cloud.height/2-1, cloud.depth/2, grid);
		// draw
		for (int i=0; i<cloud.width; i++){
			for (int j=0; j<cloud.height; j++){
				for (int k=0; k<cloud.depth; k++){
					if (isCenter(i,j,k)) continue;
					if (grid[i,j,k] != null || Random.value < cloud.pCubi){
						matrix[i,j,k] = drawCubi(i,j,k,grid);
					}
				}
			}
		}
	}
}
