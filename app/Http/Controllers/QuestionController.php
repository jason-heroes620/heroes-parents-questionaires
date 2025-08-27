<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use App\Models\SurveyResponse;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function getSection1Questions()
    {
        $questions = Question::where('section', 1)->get();
        foreach ($questions as $q) {
            $q['answers'] = Answer::where('question_id', $q->id)
                ->orderBy('weight', 'desc')
                ->get();
        }

        return response()->json($questions);
    }

    public function submitSection1(Request $request)
    {
        $responses = $request->input('responses');
        $totalScore = collect($responses)->sum('weight');
        $category = "";

        if ($totalScore >= 42 && $totalScore <= 50) {
            $category = 'Nurturer';
        } elseif ($totalScore >= 33 && $totalScore <= 41) {
            $category = 'Structurer';
        } elseif ($totalScore >= 25 && $totalScore <= 32) {
            $category = 'Freedom';
        } elseif ($totalScore >= 17 && $totalScore <= 24) {
            $category = 'Efficiency Driven';
        } elseif ($totalScore >= 9 && $totalScore <= 16) {
            $category = 'Value Centric';
        } else {
            $category = 'Community Anchored';
        }

        return response()->json(['category' => $category]);
    }

    public function getSection2Questions(Request $request, $category)
    {
        $questions = Question::where('section', 2)
            ->where('category', $category)
            ->get();

        foreach ($questions as $q) {
            $q['answers'] = Answer::where('question_id', $q->id)
                ->orderBy('weight', 'desc')
                ->get();
        }

        return response()->json($questions);
    }

    public function submitSurvey(Request $request, $category)
    {
        $category = $request->input('category');
        $email = $request->input('email');
        $name = $request->input('name');
        $section1 = $request->input('section1');

        $section2 = $request->input('section2');
        $totalScore = collect($section2)->sum('weight');
        $subCategory = "";

        $subTypes = ['Nurturer' => 4, 'Structurer' => 4, 'Freedom' => 4, 'Efficiency Driven' => 3, 'Community Anchored' => 3, 'Value Centric' => 2];

        if ($subTypes[$category] === 4) {
            $subCategory = $this->ResponseCount4($totalScore, $category);
        } else if ($subTypes[$category] === 3) {
            $subCategory = $this->ResponseCount3($totalScore, $category);
        } else if ($subTypes[$category] === 2) {
            $subCategory = $this->ResponseCount2($totalScore, $category);
        } else {
            throw new \Exception("Invalid number of responses");
        }

        SurveyResponse::create([
            'name' => $name,
            'email' => $email,
            'category' => $category,
            'sub_category' => $subCategory,
            'section1_responses' => json_encode($section1),
            'section2_responses' => json_encode($section2)
        ]);

        return response()->json(['subCategory' => $subCategory]);
    }

    private function ResponseCount4($totalScore, $category)
    {
        $subCategory = "";
        $subCategories = [
            "Nurturer" => ["Gentle Nurturer", "Co-Regulator", "EQ Builder", "Solo Rock"],

            'Structurer' => ['The Disciplinarian', 'High Achiever', 'The Helicopter Parent',  'Curriculum Curator'],
            'Freedom' => ['Creatiive Explorer', 'Brave Advernturer', 'Conscoiurs Parent', 'Gentle Rebel'],
        ];

        if ($totalScore >= 0 && $totalScore <= 3) {
            $subCategory = $subCategories[$category][3];
        } elseif ($totalScore >= 4 && $totalScore <= 7) {
            $subCategory = $subCategories[$category][2];
        } elseif ($totalScore >= 8 && $totalScore <= 11) {
            $subCategory = $subCategories[$category][1];
        } else {
            $subCategory = $subCategories[$category][0];
        }

        return $subCategory;
    }

    private function ResponseCount3($totalScore, $category)
    {
        $subCategory = "";
        $subCategories = [
            "Efficiency Driven" => ["Working Parent", "Outsourcer", "Digital-First"],
            'Community Anchored' => ['Worrior Parent', 'Community Centric', 'Aspirational Network']
        ];
        if ($totalScore >= 0 && $totalScore <= 5) {
            $subCategory = $subCategories[$category][2];
        } elseif ($totalScore >= 6 && $totalScore <= 9) {
            $subCategory = $subCategories[$category][1];
        } else {
            $subCategory = $subCategories[$category][0];
        }

        return $subCategory;
    }

    private function ResponseCount2($totalScore, $category)
    {
        $subCategory = "";
        $subCategories = [
            "Value Centric" => ["Cultural Keeper", "Eco-Conscious"],
        ];
        if ($totalScore >= 0 && $totalScore <= 5) {
            $subCategory = $subCategories[$category][1];
        } else {
            $subCategory = $subCategories[$category][0];
        }

        return $subCategory;
    }
}
