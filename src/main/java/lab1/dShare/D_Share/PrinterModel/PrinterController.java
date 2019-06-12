package lab1.dShare.D_Share.PrinterModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
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

    @GetMapping("/byRating")
    public Set<Printer> getPrintersByRating{
        List<Printer> printerList = new ArrayList<>();

        Set<Printer> allPrinters= printerService.getAllPrinters();
        for (Printer p: allPrinters) {
            printerList.add(p);
        }
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

    @GetMapping("/byOwnerId/{id}")
    public Set<Printer> getPrintersByOwnerId(@PathVariable Long id){
         return printerService.getPrintersByOwner(id);
    }

    @GetMapping("/unique")
    public Set<String> getUniquePrinters(){
        return printerService.getUniquePrinters();
    }
}