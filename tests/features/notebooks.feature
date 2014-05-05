Feature: Use Notebooks
  Background:
    Given I'm signed in as a researcher
    And I have the following Projects:
      | name               | description  |
      | ghost of tom jones | watch out    |
    And I have the following notebooks:
      | name               | projectName        |
      | top secret         | ghost of tom jones |
      | powderpuff girls   | ghost of tom jones |
    And I go to my projects

  Scenario: Notebooks Listing
    When I open the "ghost of tom jones" project
    Then I should see the following notebooks
      | name               |
      | powderpuff girls   |
      | top secret         |

  Scenario: Recent Notebooks
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I go to my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    Then I should see the following recent notebooks:
      | name              |
      | powderpuff girls  |
      | top secret        |

  Scenario: Open Notebooks
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    Then I should see the following open notebooks:
      | name              |
      | top secret        |
    And I go to my projects
    And I open the "ghost of tom jones" project
    And I view the notebook "powderpuff girls"
    Then I should see the following open notebooks:
      | name              |
      | top secret        |
      | powderpuff girls  |

  Scenario: Closing Notebooks
    When I open the "ghost of tom jones" project
    And I view the notebook "top secret"
    And I close the notebook
    Then I should see the following open notebooks:
      | name              |
  Scenario: Importing notebooks
    When I open the "ghost of tom jones" project
    And I import the notebook by uploading the "hello_world.bkr" file
    Then I should see the following notebooks
      | name               |
      | hello_world        |
      | powderpuff girls   |
      | top secret         |