<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubmitSection1Test extends TestCase
{
    use RefreshDatabase;

    /**
     * Helper to send responses and expect a category.
     */
    protected function assertCategoryForResponses(array $responses, string $expectedCategory)
    {
        $this->postJson('/submit-section1', [
            'responses' => $responses
        ])->assertStatus(200)
            ->assertJson([
                'category' => $expectedCategory
            ]);
    }

    /** @test */
    public function it_returns_value_centric_for_scores_between_9_and_16()
    {
        $this->assertCategoryForResponses(
            [['weight' => 9]],
            'Value Centric'
        );

        $this->assertCategoryForResponses(
            [['weight' => 10], ['weight' => 6]],
            'Value Centric' // 16
        );

        $this->assertCategoryForResponses(
            [['weight' => 5], ['weight' => 4]],
            'Value Centric' // 9
        );
    }

    /** @test */
    public function it_returns_efficiency_for_scores_between_17_and_24()
    {
        $this->assertCategoryForResponses(
            [['weight' => 17]],
            'Efficiency'
        );

        $this->assertCategoryForResponses(
            [['weight' => 12], ['weight' => 12]],
            'Efficiency' // 24
        );

        $this->assertCategoryForResponses(
            [['weight' => 10], ['weight' => 7]],
            'Efficiency' // 17
        );
    }

    /** @test */
    public function it_returns_freedom_for_scores_between_25_and_32()
    {
        $this->assertCategoryForResponses(
            [['weight' => 25]],
            'Freedom'
        );

        $this->assertCategoryForResponses(
            [['weight' => 20], ['weight' => 12]],
            'Freedom' // 32
        );

        $this->assertCategoryForResponses(
            [['weight' => 13], ['weight' => 12]],
            'Freedom' // 25
        );
    }

    /** @test */
    public function it_returns_structurer_for_scores_between_33_and_41()
    {
        $this->assertCategoryForResponses(
            [['weight' => 33]],
            'Structurer'
        );

        $this->assertCategoryForResponses(
            [['weight' => 20], ['weight' => 21]],
            'Structurer' // 41
        );

        $this->assertCategoryForResponses(
            [['weight' => 30], ['weight' => 3]],
            'Structurer' // 33
        );
    }

    /** @test */
    public function it_returns_nurturer_for_scores_between_42_and_50()
    {
        $this->assertCategoryForResponses(
            [['weight' => 42]],
            'Nurturer'
        );

        $this->assertCategoryForResponses(
            [['weight' => 25], ['weight' => 25]],
            'Nurturer' // 50
        );

        $this->assertCategoryForResponses(
            [['weight' => 40], ['weight' => 2]],
            'Nurturer' // 42
        );
    }

    /** @test */
    public function it_returns_community_anchor_for_scores_below_9()
    {
        $this->assertCategoryForResponses(
            [['weight' => 8]],
            'Community Anchored'
        );

        $this->assertCategoryForResponses(
            [['weight' => 3], ['weight' => 4]],
            'Community Anchored' // 7
        );

        $this->assertCategoryForResponses(
            [],
            'Community Anchored' // 0
        );
    }

    /** @test */
    public function it_returns_community_anchor_for_scores_above_50()
    {
        $this->assertCategoryForResponses(
            [['weight' => 51]],
            'Community Anchored'
        );

        $this->assertCategoryForResponses(
            [['weight' => 30], ['weight' => 25]],
            'Community Anchored' // 55
        );
    }

    /** @test */
    public function it_handles_empty_responses_gracefully()
    {
        $this->postJson('/submit-section1', ['responses' => []])
            ->assertJson(['category' => 'Community Anchored']);
    }

    /** @test */
    public function it_handles_null_responses()
    {
        $this->postJson('/submit-section1', [])
            ->assertJson(['category' => 'Community Anchored']);
    }

    /** @test */
    public function it_only_considers_weight_field_and_ignores_other_data()
    {
        $responses = [
            ['weight' => 10, 'question' => 'Q1'],
            ['weight' => 7,  'question' => 'Q2'],
        ]; // Total = 17 → Efficiency

        $this->postJson('/submit-section1', ['responses' => $responses])
            ->assertJson(['category' => 'Efficiency']);
    }
}
