package lab1.dShare.D_Share.Catalogos;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CatalogPrinter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String model;

    public CatalogPrinter() {
    }

    public CatalogPrinter(String model) {
        this.model = model;
    }

    public long getId() {
        return id;
    }


    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
