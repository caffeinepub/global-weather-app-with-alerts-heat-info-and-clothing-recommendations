import OutCall "http-outcalls/outcall";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  // Types

  type Location = {
    city : Text;
    country : Text;
    coordinates : {
      lat : Float;
      lon : Float;
    };
  };

  // Transform callback
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func getCoordinates(_location : Text) : async Location {
    blessedBerlin;
  };

  let blessedBerlin = {
    city = "Berlin";
    country = "Germany";
    coordinates = {
      lat = 52.52;
      lon = 13.405;
    };
  };

  let blessedSanFrancisco = {
    city = "San Francisco";
    country = "USA";
    coordinates = {
      lat = 37.77;
      lon = -122.4;
    };
  };
};
