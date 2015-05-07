(ns bunsen.publications.resource.seed
  (:require [liberator.core :refer [defresource]]
            [datomic.api :as d]
            [bunsen.publications.component.database :as db]
            [bunsen.publications.helper.resource :as resource]))

(defresource seed [_ _] resource/defaults
  :allowed-methods [:delete]
  :delete! (fn [_]
             (d/delete-database (:db-uri request))
             (d/create-database (:db-uri request))
             (db/migrate (d/connect (:db-uri request)) "migrations.edn")))