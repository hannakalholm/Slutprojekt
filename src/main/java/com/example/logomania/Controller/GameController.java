package com.example.logomania.Controller;

import com.example.logomania.Repository.DataRepository;
import com.example.logomania.Repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class GameController {

    @Autowired
    DataRepository dataRepository;

    @GetMapping("/test")
    @ResponseBody
    public List<String> getAllWords(){
        List<String> hejtest = dataRepository.getAllWordsforOneSound('S');
        for (String allWord : hejtest) {
            System.out.println(allWord);

        }
        return hejtest;
    }

}
