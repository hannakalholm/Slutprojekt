package com.example.logomania.Repository;

import com.example.logomania.Entity.Phrase;
import com.example.logomania.Entity.Word;

import java.util.List;

public interface DataRepository {

    List<Word> getAllWordsForOnePhoneme(String phoneme);
    List<Word> generateRandomFiveWords (List<Word> allWordsForOnePhoneme);
    List<Phrase> generatePhrasesWhenCorrect();
    List<Phrase> generatePhrasesWhenIncorrect();


//    List<String> getAllWordsForOnePhoneme(String phoneme);

}
