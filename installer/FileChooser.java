
package installerdejaview;

import java.awt.Component;
import java.io.File;
import javax.swing.JFileChooser;

public class FileChooser {
    
    
    private String lastChosenDir = System.getProperty("user.home");
    private final JFileChooser chooser = new JFileChooser();
    private final Component parent;

    public FileChooser(Component parent) {
        this.lastChosenDir = System.getProperty("user.dir");
        this.parent = parent;
    }
    
    public String chooseFile() {
        return this.chooseAndSaveLastDir(this.chooser, "Datei auswählen", this.lastChosenDir, JFileChooser.FILES_ONLY);
    }
    
    public String chooseDirectory() {
        return this.chooseAndSaveLastDir(this.chooser, "Ordner auswählen", this.lastChosenDir, JFileChooser.DIRECTORIES_ONLY);
    }
    
    private String chooseAndSaveLastDir(JFileChooser chooser, String dialogTitle, String startDir, int mode) {
        String selected = this.choose(chooser, dialogTitle, startDir, mode); 
        if(new File(selected).isFile()) {
            this.lastChosenDir = selected.substring(0, selected.lastIndexOf('\\'));
        } else {
            this.lastChosenDir = selected;
        }
        return selected;
    }
    
    private String choose(JFileChooser chooser, String dialogTitle, String startDir, int mode) {
        chooser.setCurrentDirectory(new File(startDir));
        chooser.setDialogTitle(dialogTitle);
        chooser.setFileSelectionMode(mode);
        if (chooser.showOpenDialog(this.parent) == JFileChooser.APPROVE_OPTION) {
            return chooser.getSelectedFile().toString();
        } else {
            return "";
        }
    }
}
