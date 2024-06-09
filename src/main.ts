import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";




async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const adminConfig: ServiceAccount = {
    "projectId": 'conge-project-418f3',
    "privateKey":'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1Gx0VUTpvJkBf\nNN8asPL8/47aLgMHG0Qf4ofVnNCnoG2Vju8ynTIneVASwYTPiBbvduB84H28JK1K\nGMcKEm1cRVu1+63E9or7umYSO8ao/Z5CCWVqh7yH7T7qcnd60LISyLB+tfPH08fR\nw+vI9iksxqlb3AczePLezDFKp8gCP2uF6HR6f9AWrRpMeA1E6dSKnws+n6jZEQPN\nSgRC3OvLH+ShWeuLQP9ZHQazgdwzjHO2MqoNZTHyav1fwmB3+brEf80nadZBQYXJ\nRw/ySsRqyx4oL30yZ0Knk07g591nGW8ANLSmZ7HmvC+xOLQIFVflk8ixX8tq+/Eg\nbmP2dmibAgMBAAECggEAOUCfCxQosuaWxwJB3YA+8Lghgtu03VRDTwkgA+mVFMjk\nm7kZ6RhEuLHjHGrM/4Z4Ka+c/B1D4mx908TNd2On6tmKSpeLsY53FWkxx2XaQaYb\nl6i8xNawRRA9KYSSPOMoyENleEkxDeTncGrNaTRYg+0xsPZ32E/OB5zpoD42Pm8h\np3MsCbnNaihix9Ocm0quXTGDYF55aBE8clQ8K6YU2flDgCs1Md+SU+chJq/gMu6Q\nzetfOULg9n/Kn3QaCBjZmjyVTDP8/CoLxwdvk9qK4lOoxN3mVbYFTSxhQdTmbfrE\n29LLeroQZhUmk92bygEjuDRpJT5xZyMDTOd56tJzoQKBgQDm8SzvfNqtos0hvkAQ\n1t77zVU5hkBaD9XAZhebdZm54D1iynXlSFPI/nDvukvZSc8h3yw7NMdz5QhODHOt\nF6WwwJoJ+3hO+ibxuXEld/gvWCJS/7zf97vSO3GiAMbS81xdz+bi8jGVlhdwlFH/\n7IH8O4zwMvmkVr4YCK6ydf9vUwKBgQDIwaZyH7OHLrsczn3q/wQ6VPPPxPP1RQKQ\n1W6tgT4lu8GL+orkqdI/h3VjJAA5sP1N7egx8ir/f97gqVk1wjRvZgFMV75PDeGE\nZ8YEofwzsZSp7/7R301R/HVSpXvOyNWrtefc2vd5dK4tvVWecHo0LmMOpM7NrF5X\nB8ABJcOgmQKBgHB01oXUDYRp92vMAdRxXWnORgbZ+fIhLdwfmrVH4dCigiHeJuS8\ngJgqVoJV/GNVzrhWvWojPFCSIaYn6BhMoJFeaGQeASqsI1SoEZHGRqN/Tk+OWsHR\nF7O64I2bxTWp7bt85phyiXSm/skCYJ+34mAZ+3pnyCqfVrfLWo5qaTUjAoGALT9Q\nN3qjqP1EWPrFcJinqEoLZbG7VnWGXYRtXJe7nR+TQOxoL5+C7qSmNYEgt+AHR3Au\nnEs7m7iDUFl67N3nmZABDObd0s2LHZ+SButHf5MvsZmQ8laFA8yF2OnJXNLxLbFj\nH+kOTAabV13MFVi+glJOKzfEEKEf5jet89RCIkkCgYEAvDQ8AQ2AxAwVaOHc0Okg\nEcMMD6EOc3e4jsCynmXGCjEjVpxzuitdTztKmL4uVYhehiyznomzL0kvX/TXHVl8\nkBjAZrVW+mVARdhDFrxlF3hp8QQi2rosOgY2H1Q/7sQujSbY0KS8vWKdeaO9IAH9\nb+WfrLEm3L2gAHD55luVEBA=\n-----END PRIVATE KEY-----\n',
      
    "clientEmail":'firebase-adminsdk-azmrf@conge-project-418f3.iam.gserviceaccount.com',
  };
// Initialize the firebase admin app
admin.initializeApp({
  credential: admin.credential.cert(adminConfig)
});

  app.enableCors(); 

  await app.listen(3000,'0.0.0.0');
}
bootstrap();
