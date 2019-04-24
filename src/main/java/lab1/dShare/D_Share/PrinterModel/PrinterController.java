package lab1.dShare.D_Share.PrinterModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/printers")
public class PrinterController {

    @Autowired
    private PrinterService printerService;

    @GetMapping()
    public Set<Printer> getAllPrinters(){
        return printerService.getAllPrinters();
    }

    @GetMapping("{id}")
    public Printer getPrinter(@PathVariable Integer id){
        return printerService.getPrinter(id);
    }

    @PostMapping("/add")
    public void addPrinter(@RequestBody Printer printer){
        printerService.addPrinter(printer);
    }

    @PostMapping("/update")
    public void updatePrinter(@RequestBody Printer user){
        printerService.updatePrinter(user);
    }

    @PutMapping("/delete/{id}")
    public void deletePrinter(@PathVariable Integer id){
        printerService.deletePrinter(id);
    }

}
