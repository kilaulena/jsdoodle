Feature: polls
  In order to be able to find a common ground
  As a user
  I want to create a poll and vote

  Scenario: create a poll
    When I go to the start page
      And I follow "Create a poll"
      And I fill in "Title" with "Wo gehen wir heute essen?"
      And I follow "Add choice"
      And I fill in "Choice 1" with "Bulgare"
      And I follow "Add choice"
      And I fill in "Choice 2" with "Russe"
      And I follow "Add choice"
      And I fill in "Choice 3" with "Frittiersalon"
      And I press "Save"
    # Then I should see "Poll successfully created"
    Then I should see "Wo gehen wir heute essen?"
      And I should see "Bulgare"
      And I should see "Russe"
      And I should see "Frittiersalon"
      And I should see "Please vote here:"

  Scenario: vote on a poll
    Given a poll with title "Wo gehen wir essen?" and choices "Bulgare, Frittiersalon"
    When I go to the start page
      And I follow "Wo gehen wir essen?"
      And I fill in "Name" with "Lena"
      And I check "Bulgare"
      And I press "Vote"
    Then I should see "Thanks for your vote"
      And I should see "okay" 
      And I should see "nok"
      And I should see "okay" before "nok"
  