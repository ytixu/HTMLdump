package swingTest;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.util.ArrayList;
import java.util.Random;
import java.util.Stack;

import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextPane;
import javax.swing.SwingConstants;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.StyleConstants;
import javax.script.ScriptEngineManager;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

public class GUI extends JFrame{
	private static final int MARGIN = 10;
	private static final int WIDTH = 300;
	private static final int HEIGHT = 400;
	
	private String inputString = "";
	private char[] symbols = new char[]{
			'1','2','3','+','4','5','6','-','7','8','9','*','0','/','%','='
	};
	private JLabel aImage = new JLabel();
	private JTextPane textBox = new JTextPane();
	private JScrollPane scrollBox = new JScrollPane(textBox);
	private JButton[] aButtons = new JButton[symbols.length];
	private JPanel numberPad = new JPanel();
	
	private String[] answers = new String[]{
			"Java doesn't know. Java tells you to ask your brain.",
			"The same answer to the question \"How many toilet break you have in a day\".",
			"Your equation is offensive.",
	};
	
	private Random rnd = new Random();
	private ScriptEngineManager mgr = new ScriptEngineManager();
	private ScriptEngine engine = mgr.getEngineByName("JavaScript");
	
	public GUI(){
		super("Draw the duck");
		// text
		scrollBox.setPreferredSize(new Dimension(WIDTH, HEIGHT/2));
		scrollBox.getVerticalScrollBar().setPreferredSize(new Dimension(0, 0));
		SimpleAttributeSet attribs = new SimpleAttributeSet();  
		StyleConstants.setAlignment(attribs , StyleConstants.ALIGN_RIGHT);  
		textBox.setParagraphAttributes(attribs,true);
		textBox.setDisabledTextColor(Color.BLACK);
		textBox.disable();
		scrollBox.getVerticalScrollBar().addAdjustmentListener(new AdjustmentListener() {  
	        public void adjustmentValueChanged(AdjustmentEvent e) {  
	            e.getAdjustable().setValue(e.getAdjustable().getMaximum());  
	        }

	    });
		// add buttons 
		numberPad.setLayout(new GridLayout(4,3));
		for (int i=0; i<symbols.length; i++){
			aButtons[i] = new JButton(Character.toString(symbols[i]));
			aButtons[i].setActionCommand(Character.toString(symbols[i]));
			if (i == symbols.length-1) break;
			aButtons[i].addActionListener(new ActionListener(){
				@Override
				public void actionPerformed(ActionEvent e) {
					String command = ((JButton) e.getSource()).getActionCommand();
					updateText(command);
				}
			});
			numberPad.add(aButtons[i]);
		}
		// = button
		aButtons[symbols.length-1].addActionListener(new ActionListener(){
			@Override
			public void actionPerformed(ActionEvent e) {
				String command = ((JButton) e.getSource()).getActionCommand();
				displayResult(command);
			}
		});
		numberPad.add(aButtons[symbols.length-1]);
		
		getContentPane().setLayout(
			new BoxLayout(getContentPane(), BoxLayout.PAGE_AXIS)
		);
		add(scrollBox);
		add(numberPad);
		setLocationRelativeTo(null);
		setPreferredSize(new Dimension(WIDTH, HEIGHT));
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		pack();
		setResizable(false);
		setVisible(true);
	}
	
	private String evalMath(){
		String result;
	    try{
	    	try{
	    		result = Double.toString((Double)engine.eval(inputString));
	    	}catch(ClassCastException e){
	    		result = Integer.toString((Integer)engine.eval(inputString));
	    	}
	    }catch(ScriptException | NullPointerException e){
	    	result = answers[(int) Math.floor(rnd.nextFloat()*answers.length)];
	    }
		return result;
	}

	public void updateText(String input){
		textBox.setText(textBox.getText() + input);
		if (input.equals("=")) return;
		inputString += input;
	}
	public void displayResult(String input){
		updateText(input);
		textBox.setText(textBox.getText() + "\n");
		textBox.setText(textBox.getText() + evalMath() + "\n");
		inputString = "";
		System.out.println(textBox.getDocument().getLength());
	}
	
	public static void main(String[] pArgs)
	{
		new GUI();
	}
}
