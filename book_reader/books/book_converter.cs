using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Collections;

namespace converter
{
    class Program
    {
        static string TTLE = "$title$";
        static string CHAP = "$chap$";

        static string CHAPSRT = "var TEXT = \'";
        static string CHAPEND = "\';\ndocument.getElementById(\"book\").innerHTML = TEXT;";

        static string toText(object content, string className)
        {
            return String.Format("<p class=\"{0}\">{1}</p>", className, content.ToString());
        }

        static void Main(string[] args)
        {
            StreamWriter bookWriter = new StreamWriter("books.js");
            StreamWriter chapWriter = null;
            int chapNumber = 0;
            string bookTitle = "";
            ArrayList bookChaps = new ArrayList();
            string[] fileEntries = Directory.GetFiles(@"./");
            foreach (string fileName in fileEntries)
            {
                if (!fileName.EndsWith(".txt"))
                {
                    continue;
                }
                string[] text = File.ReadAllLines(fileName);
                foreach (string l in text)
                {
                    string  line = l.Replace("\\", "\\\\").Replace("\'", "\\\'");
                    // title
                    if (line.StartsWith(TTLE))
                    {
                        if (bookTitle != "")
                        {
                            bookWriter.Write("[\"{0}\"]);\n", String.Join("\",\"",bookChaps.ToArray()));
                            bookChaps.Clear();
                        }
                        bookTitle = line.Remove(0, TTLE.Length);
                        bookWriter.Write("books.add(\"{0}\",", bookTitle);
                        chapNumber = 0;
                    }// chapter 
                    else if (line.StartsWith(CHAP))
                    {
                        if (chapWriter != null)
                        {
                            chapWriter.Write(CHAPEND);
                            chapWriter.Close();
                        }
                        chapWriter = new StreamWriter(String.Format("{0}_{1}.js", bookTitle.Replace(" ", "_"), chapNumber.ToString()));
                        chapNumber++;
                        chapWriter.Write(CHAPSRT);
                        chapWriter.Write(toText(bookTitle, "title"));
                        bookChaps.Add(line.Remove(0, CHAP.Length));
                        chapWriter.Write(toText(bookChaps[bookChaps.Count-1], "chapter"));
                    }
                    else if (chapWriter != null)
                    {
                        chapWriter.Write(toText(line, "text"));
                       
                    }

                }
            }
            bookWriter.Write("[\"{0}\"]);\n", String.Join("\",\"", bookChaps.ToArray()));
            bookWriter.Close();
            chapWriter.Write(CHAPEND);
            chapWriter.Close();
            Console.Out.Write("Done.");
            Console.In.Read();
        }
    }
}
