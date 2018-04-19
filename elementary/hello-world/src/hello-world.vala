public class HelloWorld : Gtk.Application {

    public HelloWorld () {
        Object (
            application_id: "com.github.pojntfx.incubator",
            flags: ApplicationFlags.FLAGS_NONE
        );
    }

    protected override void activate () {
        var main_window = new Gtk.ApplicationWindow (this);
        main_window.default_height = 300;
        main_window.default_width = 300;
        main_window.title = "Hello World";

        var button_hello = new Gtk.Button.with_label ("Click me!");
        button_hello.margin = 12;
        button_hello.clicked.connect(() => {
            // Change the button's text
            button_hello.label = "Hello World!";
            // Disable the button
            button_hello.sensitive = false;
        });

        main_window.add (button_hello);
        main_window.show_all ();
    }

    public static int main (string[] args) {
        var app = new HelloWorld ();
        return app.run (args);
    }

}
