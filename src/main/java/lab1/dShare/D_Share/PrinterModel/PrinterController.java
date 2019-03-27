package lab1.dShare.D_Share.PrinterModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Printers")
public class PrinterController {

    @Autowired
    private PrinterService printerService;

    @GetMapping()
    public List<Printer> getAllPrinters(){
        return printerService.getAllPrinters();
    }

    @GetMapping("{id}")
    public Printer getPrinter(@PathVariable String id){
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
    public void deletePrinter(@PathVariable String id){
        printerService.deletePrinter(id);
    }

}
