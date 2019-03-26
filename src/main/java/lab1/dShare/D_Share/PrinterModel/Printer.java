package lab1.dShare.D_Share.PrinterModel;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Printer {
    @Id
    private Integer id;
    private String model;

    public Printer(Integer id, String model) {
        this.id = id;
        this.model = model;
    }

    public Integer getId() {
        return id;
    }

    public String getModel() {
        return model;
    }
}
