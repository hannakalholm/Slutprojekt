package com.example.logomania.Controller;

import com.example.logomania.Entity.Word;
import com.example.logomania.Repository.DataRepository;
import com.example.logomania.Repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class GameController {

    @Autowired
    DataRepository dataRepository;

    @PostMapping("/test")
    @ResponseBody
    public List<Word> getRandomFiveWords(@RequestParam String phoneme){

        List<Word> allWordsForOnePhoneme = dataRepository.getAllWordsForOnePhoneme(phoneme);
        List<Word> fiveRandomWords = dataRepository.generateRandomFiveWords(allWordsForOnePhoneme);
        for (Word allWord : fiveRandomWords ) {
            System.out.println(allWord);

        }
        return fiveRandomWords;
    }

}
