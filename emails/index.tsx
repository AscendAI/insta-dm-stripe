import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface WaitlistEmailProps {
  name: string
}

const baseUrl = 'https://stripe-subscription-beryl.vercel.app'

export const WelcomeEmail: React.FC<Readonly<WaitlistEmailProps>> = ({
  name,
}) => (
  <Html>
    <Head />
    <Preview>Welcome to InstaDM</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Column>
            <Row>
              <Column>
                <Img
                  style={sectionLogo}
                  src={`${baseUrl}/sz-logo.png`}
                  width="200"
                  alt="CleverCore"
                />
              </Column>
              <Column>
                <Text
                  style={{
                    ...paragraph,
                    paddingTop: '20px',
                    paddingLeft: '10px',
                    fontWeight: 'bold',
                    fontSize: '44px',
                    color: '#484848',
                  }}
                >
                  InstaDM
                </Text>
              </Column>
            </Row>
          </Column>
        </Section>

        <Section style={paragraphContent}>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Text style={paragraph}>
            Dear{' '}
            <strong
              style={{ ...paragraph, fontSize: '24px', color: '#901bf7' }}
            >
              {name},
            </strong>
          </Text>
          <Text style={paragraph}>
            It's time to exponentially increase your outreach! Welcome to
            InstaDM 🎉
          </Text>

          <Text style={paragraph}>
            My name is Ritesh Verma and I am the founder of InstaDM. As someone
            who has started multiple successful agencies and is acquainted with
            other successful agency owners, I have seen the struggles of having
            sub-par outreach. With Instagram being one of the top two client
            acquisition mediums, making sure you have the BEST Instagram
            outreach can be quite challenging, especially with flagging, account
            bans, and dm limits.
          </Text>

          <Text style={paragraph}>
            This is where InstaDM, the world's first fully automated Instagram
            dm tool comes in. With unlimited dming capabilities, account
            rotation, proxy rotation, custom messaging, dual browser dming, and
            auto lead generation features, this tool will for sure transform
            your outreach by 10-100X.
          </Text>

          <Text style={paragraph}>
            We do offer a free trial and to unlock the full power of InstaDM, be
            sure to check out the Starter, Pro, and Enterprise plans!
          </Text>

          <Text style={paragraph}>
            Resources:
            <br />
            Documentation:
            https://pond-stingray-e73.notion.site/InstaDM-Guide-7986494b4140436ea94646531ce3b36b
            <br />
            YT Video: https://www.youtube.com/watch?v=rEx0_r5u2As
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={{ textAlign: 'center', color: '#706a7b' }}>
            © 2024 instadm.ai, All Rights Reserved
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#F6F6F6',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const sectionLogo = {
  padding: '0 40px',
  paddingTop: '20px',
}

const container = {
  margin: '30px auto',
  width: '610px',
  backgroundColor: '#ffffff',
  overflow: 'hidden',
}

const paragraphContent = {
  padding: '0 40px',
}

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
  fontWeight: '400',
}

const sectionsBorders = {
  width: '100%',
  display: 'flex',
  margin: '20px 0',
}

const sectionBorder = {
  borderBottom: '1px solid rgb(238,238,238)',
  width: '249px',
}

const sectionCenter = {
  borderBottom: '1px solid rgb(145,71,255)',
  width: '102px',
}

const footer = {
  width: '580px',
  margin: '0 auto',
}
