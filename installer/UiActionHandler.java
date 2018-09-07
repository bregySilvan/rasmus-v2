
package installerdejaview;

public class UiActionHandler {

    private final InstallerUi ui;
    private final FileChooser chooser;
    
    public UiActionHandler(InstallerUi ui) {
        this.ui = ui;
        this.chooser = new FileChooser(ui);
    }
    
    public String selectFile() {
        return this.chooser.chooseFile();
    }
    
    public String selectFolder() {
       return this.chooser.chooseDirectory();
    }
    
    public void saveSettings() {
        System.out.println("saving settings:");
        System.out.println("customPictureFolder "+ this.ui.getCustomPictureFolder());
        System.out.println("installationFolder "+ this.ui.getInstallationPath());
        System.out.println("steinBocKActivated "+ this.ui.isSteinbockActivated());
        System.out.println("steinBockCount "+ this.ui.getSteinbockCount());
        
    }
}
